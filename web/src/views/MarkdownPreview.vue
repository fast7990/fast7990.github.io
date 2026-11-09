<template>
  <div class="markdown-preview">
    <h1 class="page-title">Markdown 预览</h1>

    <!-- 工具栏 -->
    <div class="toolbar">
      <button class="tool-btn" @click="handleClear">
        <span class="btn-icon">🗑️</span>
        <span class="btn-text">清空</span>
      </button>
      <button class="tool-btn" @click="handleCopy">
        <span class="btn-icon">📋</span>
        <span class="btn-text">{{ copied ? '已复制' : '复制 Markdown' }}</span>
      </button>
      <button class="tool-btn" @click="handleCopyHtml">
        <span class="btn-icon">📄</span>
        <span class="btn-text">复制 HTML</span>
      </button>
      <button class="tool-btn" @click="loadExample">
        <span class="btn-icon">📝</span>
        <span class="btn-text">加载示例</span>
      </button>
      <!-- 导出为 PDF -->
      <button class="tool-btn" :disabled="isExporting" @click="handleExportPDF">
        <span class="btn-icon">
          <span v-if="isExporting" class="spinner-small"></span>
          <template v-else>📕</template>
        </span>
        <span class="btn-text">{{ isExporting ? '导出中…' : '导出为 PDF' }}</span>
      </button>
    </div>

    <!-- 导出状态提示 -->
    <transition name="fade">
      <div v-if="statusMessage" :class="['status-hint', statusMessage.type]">
        <span class="status-icon">{{ statusMessage.type === 'error' ? '⚠️' : '✅' }}</span>
        <span class="status-text">{{ statusMessage.text }}</span>
      </div>
    </transition>

    <!-- Markdown 解析错误提示 -->
    <div v-if="error" class="error-hint">
      <span class="error-icon">⚠️</span>
      <span class="error-text">{{ error }}</span>
    </div>

    <!-- 双栏布局 -->
    <div class="editor-layout">
      <!-- 左侧编辑区 -->
      <GlassContainer class="editor-panel">
        <div class="panel-header">
          <span class="panel-label">Markdown 编辑</span>
          <span class="panel-count">{{ content.length }} 字符</span>
        </div>
        <textarea
          ref="editorRef"
          v-model="content"
          class="code-textarea"
          placeholder="在此输入 Markdown 内容...&#10;&#10;# 标题&#10;&#10;**粗体** *斜体*&#10;&#10;- 列表项&#10;- 列表项&#10;&#10;[链接](url)&#10;&#10;```javascript&#10;代码块&#10;```"
          spellcheck="false"
          @scroll="handleEditorScroll"
          @input="handleInput"
        ></textarea>
      </GlassContainer>

      <!-- 右侧预览区 -->
      <GlassContainer class="preview-panel">
        <div class="panel-header">
          <span class="panel-label">实时预览</span>
          <span class="panel-count">{{ htmlContent.length }} 字符</span>
        </div>
        <div
          ref="previewRef"
          class="preview-content markdown-body"
          @scroll="handlePreviewScroll"
          v-html="htmlContent"
        ></div>
      </GlassContainer>
    </div>

    <!-- PDF 导出用的渲染容器（仅在导出时挂载，由加载遮罩覆盖） -->
    <div v-if="isExporting" ref="exportRef" class="pdf-export" aria-hidden="true">
      <div class="markdown-body pdf-markdown" v-html="htmlContent"></div>
    </div>

    <!-- 导出加载遮罩 -->
    <transition name="fade">
      <div v-if="isExporting" class="export-overlay">
        <div class="export-card">
          <div class="export-spinner"></div>
          <p class="export-title">正在生成 PDF</p>
          <p class="export-subtitle">正在渲染内容并自动分页，请稍候…</p>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted, nextTick } from 'vue'
import MarkdownIt from 'markdown-it'
import GlassContainer from '../components/GlassContainer.vue'
import { useClipboard } from '../composables/useClipboard.js'

const { copied, copy } = useClipboard()

const md = new MarkdownIt({
  html: true,
  xhtmlOut: true,
  breaks: true,
  linkify: true,
  typographer: true
})

const content = ref('')
const htmlContent = ref('')
const error = ref('')
const editorRef = ref(null)
const previewRef = ref(null)
const exportRef = ref(null)

// PDF 导出状态
const isExporting = ref(false)
// 导出状态提示：{ type: 'success' | 'error', text: string }
const statusMessage = ref(null)

let scrollTimeout = null
let isSyncing = false
let statusTimer = null

const exampleContent = `# Markdown 语法示例

欢迎使用 Markdown 预览工具！

## 标题

# 一级标题
## 二级标题
### 三级标题
#### 四级标题
##### 五级标题
###### 六级标题

## 文本样式

**粗体文本**

*斜体文本*

~~删除线文本~~

**粗体和*斜体*组合**

## 列表

### 无序列表

- 列表项 1
- 列表项 2
  - 嵌套列表项
  - 嵌套列表项
- 列表项 3

### 有序列表

1. 第一项
2. 第二项
3. 第三项

## 链接和图片

[访问 GitHub](https://github.com)

![示例图片](https://picsum.photos/400/200)

## 代码块

### 行内代码

这是一段 \`inline code\`。

### 代码块

\`\`\`javascript
function greet(name) {
  console.log('Hello, ' + name)
}
\`\`\`

\`\`\`python
def hello(name):
    print(f"Hello, {name}")
\`\`\`

## 引用

> 这是一段引用文本。
> 
> 引用可以包含多行内容。

## 表格

| 功能 | 说明 | 状态 |
|------|------|------|
| JSON 格式化 | 格式化和压缩 JSON | ✅ |
| 图片转 Base64 | 图片编码转换 | ✅ |
| 二维码生成 | 生成二维码 | ✅ |

## 分割线

---

## 任务列表

- [x] 完成 JSON 格式化工具
- [x] 完成图片转 Base64 工具
- [x] 完成二维码生成工具
- [ ] 添加 Markdown 预览功能
`

function renderMarkdown(text) {
  if (!text.trim()) return ''
  try {
    error.value = ''
    return md.render(text)
  } catch (err) {
    error.value = 'Markdown 解析错误: ' + err.message
    return text
  }
}

let debounceTimer = null
function handleInput() {
  if (debounceTimer) clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => {
    htmlContent.value = renderMarkdown(content.value)
  }, 150)
}

function handleEditorScroll() {
  if (isSyncing) return
  isSyncing = true
  if (scrollTimeout) clearTimeout(scrollTimeout)
  scrollTimeout = setTimeout(() => {
    syncScroll('editor')
    isSyncing = false
  }, 50)
}

function handlePreviewScroll() {
  if (isSyncing) return
  isSyncing = true
  if (scrollTimeout) clearTimeout(scrollTimeout)
  scrollTimeout = setTimeout(() => {
    syncScroll('preview')
    isSyncing = false
  }, 50)
}

function syncScroll(source) {
  const editor = editorRef.value
  const preview = previewRef.value
  if (!editor || !preview) return

  const editorScrollable = editor.scrollHeight - editor.clientHeight
  const previewScrollable = preview.scrollHeight - preview.clientHeight
  if (editorScrollable <= 0 || previewScrollable <= 0) return

  if (source === 'editor') {
    const editorScrollPercent = editor.scrollTop / editorScrollable
    preview.scrollTop = editorScrollPercent * previewScrollable
  } else {
    const previewScrollPercent = preview.scrollTop / previewScrollable
    editor.scrollTop = previewScrollPercent * editorScrollable
  }
}

async function handleClear() {
  content.value = ''
  htmlContent.value = ''
  error.value = ''
  clearStatus()
}

async function handleCopy() {
  if (!content.value) {
    alert('编辑区为空，无内容可复制')
    return
  }
  await copy(content.value)
}

async function handleCopyHtml() {
  if (!htmlContent.value) {
    alert('预览区为空，无内容可复制')
    return
  }
  await copy(htmlContent.value)
}

function loadExample() {
  content.value = exampleContent
}

/* -------------------------- PDF 导出相关 -------------------------- */

// 显示状态提示（定时自动消失）
function showStatus(type, text, duration = 3500) {
  if (statusTimer) {
    clearTimeout(statusTimer)
    statusTimer = null
  }
  statusMessage.value = { type, text }
  if (duration > 0) {
    statusTimer = setTimeout(() => {
      statusMessage.value = null
      statusTimer = null
    }, duration)
  }
}

// 清除状态提示
function clearStatus() {
  if (statusTimer) {
    clearTimeout(statusTimer)
    statusTimer = null
  }
  statusMessage.value = null
}

// 等待页面字体加载完成，避免 PDF 中文字缺失或错位
async function waitForFonts() {
  if (document.fonts && document.fonts.ready) {
    try {
      await document.fonts.ready
    } catch (err) {
      // 忽略字体加载异常，不影响导出主流程
    }
  }
}

// 将 Blob 转为 data URL
function blobToDataUrl(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = () => reject(reader.error)
    reader.readAsDataURL(blob)
  })
}

// 将外部图片内联为 data URL，避免跨域图片在 canvas 中无法绘制
async function inlineImages(root) {
  if (!root) return
  const images = Array.from(root.querySelectorAll('img'))
  await Promise.all(
    images.map(async (img) => {
      const src = img.getAttribute('src') || ''
      // 已是内联资源或本地 blob 时无需处理
      if (!src || src.startsWith('data:') || src.startsWith('blob:')) return
      try {
        const controller = new AbortController()
        const timer = setTimeout(() => controller.abort(), 5000)
        const response = await fetch(src, { mode: 'cors', signal: controller.signal })
        clearTimeout(timer)
        if (!response.ok) return
        const blob = await response.blob()
        img.src = await blobToDataUrl(blob)
      } catch (err) {
        // 跨域受限时保留原始地址，交由 html2canvas 继续尝试渲染
      }
    })
  )
}

// 等待容器内所有图片加载完成（带超时兜底）
function waitForImages(root) {
  if (!root) return Promise.resolve()
  const images = Array.from(root.querySelectorAll('img'))
  if (!images.length) return Promise.resolve()

  return Promise.all(
    images.map(
      (img) =>
        new Promise((resolve) => {
          if (img.complete) {
            resolve()
            return
          }
          let timer = null
          const finish = () => {
            if (timer) {
              clearTimeout(timer)
              timer = null
            }
            resolve()
          }
          img.addEventListener('load', finish, { once: true })
          img.addEventListener('error', finish, { once: true })
          // 外部图片加载过慢时最多等待 5 秒
          timer = setTimeout(finish, 5000)
        })
    )
  )
}

// 生成带时间戳的 PDF 文件名
function buildPdfFileName() {
  const now = new Date()
  const pad = (value) => String(value).padStart(2, '0')
  return `markdown-${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}-${pad(
    now.getHours()
  )}${pad(now.getMinutes())}.pdf`
}

// A4 纸张参数（单位：毫米）
const PDF_PAGE_WIDTH = 210
const PDF_PAGE_HEIGHT = 297
const PDF_MARGIN = 12

// 在一段待分页区域中寻找最合适的切分位置：
// 从理想分页线向上回退，找到一整行都是背景色（没有文字/图形）的位置，
// 避免把文字行或图片从中间切开导致内容被截断。
// PDF 使用白色背景，因此亮度明显低于白色的像素视为内容。
function findSafeBreakRow(imageData, width, startY, idealEndY) {
  const searchHeight = idealEndY - startY
  if (searchHeight <= 2) return idealEndY

  const sampleStepX = 8
  const inkThreshold = 200

  for (let row = searchHeight - 1; row >= 0; row--) {
    const rowOffset = row * width * 4
    let hasContent = false

    for (let x = 0; x < width; x += sampleStepX) {
      const index = rowOffset + x * 4
      if (
        imageData[index] < inkThreshold ||
        imageData[index + 1] < inkThreshold ||
        imageData[index + 2] < inkThreshold
      ) {
        hasContent = true
        break
      }
    }

    if (!hasContent) return startY + row
  }

  return idealEndY
}

// 导出当前预览内容为 PDF
async function handleExportPDF() {
  if (isExporting.value) return

  if (!content.value.trim()) {
    showStatus('error', '编辑区为空，没有可导出的内容')
    return
  }

  isExporting.value = true
  clearStatus()

  try {
    // 等待渲染容器根据最新 Markdown 内容完成挂载
    await nextTick()

    const root = exportRef.value
    if (!root) throw new Error('未找到导出容器')

    // 等待字体与图片资源就绪，避免导出后内容缺失
    await waitForFonts()
    await inlineImages(root)
    await waitForImages(root)

    // 按需加载渲染库，避免增大首屏体积
    const [html2canvasModule, jsPdfModule] = await Promise.all([
      import('html2canvas'),
      import('jspdf')
    ])
    const html2canvas = html2canvasModule.default || html2canvasModule
    const jsPDF = jsPdfModule.jsPDF || jsPdfModule.default

    // 1. 将渲染后的完整 HTML 内容截取为高清画布
    //    scale: 2 保证文字与代码在 PDF 中足够清晰
    const canvas = await html2canvas(root, {
      scale: 2,
      useCORS: true,
      allowTaint: false,
      backgroundColor: '#ffffff',
      logging: false,
      windowWidth: document.documentElement.clientWidth
    })

    if (!canvas || !canvas.width || !canvas.height) {
      throw new Error('内容渲染失败，请稍后重试')
    }

    // 2. 创建 A4 纵向 PDF 文档
    const pdf = new jsPDF({
      unit: 'mm',
      format: 'a4',
      orientation: 'portrait',
      compress: true
    })

    const contentWidthMm = PDF_PAGE_WIDTH - PDF_MARGIN * 2
    const contentHeightMm = PDF_PAGE_HEIGHT - PDF_MARGIN * 2
    // 画布像素与实际毫米的换算比例
    const pixelsPerMm = canvas.width / contentWidthMm
    const pageHeightPx = Math.floor(contentHeightMm * pixelsPerMm)
    // 分页时最多向前回退 32mm 寻找安全的切分位置
    const searchRangePx = Math.floor(32 * pixelsPerMm)
    const canvasContext = canvas.getContext('2d')

    let offsetY = 0
    let pageIndex = 0

    // 3. 逐页截取画布并写入 PDF，实现自动分页
    while (offsetY < canvas.height) {
      let endY = Math.min(offsetY + pageHeightPx, canvas.height)

      // 非最后一页时，尝试把分页点移动到没有文字的行
      if (endY < canvas.height) {
        const searchStartY = Math.max(offsetY, endY - searchRangePx)
        const bandHeight = endY - searchStartY

        if (bandHeight > 2) {
          const bandData = canvasContext.getImageData(
            0,
            searchStartY,
            canvas.width,
            bandHeight
          ).data
          const safeEndY = findSafeBreakRow(bandData, canvas.width, searchStartY, endY)
          // 回退过多会让页面内容过少，差距过大时仍按原分页点切分
          if (endY - safeEndY <= searchRangePx) {
            endY = safeEndY
          }
        }
      }

      // 防止极少数情况下分页点无法前进造成死循环
      if (endY <= offsetY) {
        endY = Math.min(offsetY + pageHeightPx, canvas.height)
      }

      const sliceHeight = endY - offsetY
      const pageCanvas = document.createElement('canvas')
      pageCanvas.width = canvas.width
      pageCanvas.height = sliceHeight

      const pageContext = pageCanvas.getContext('2d')
      pageContext.fillStyle = '#ffffff'
      pageContext.fillRect(0, 0, pageCanvas.width, pageCanvas.height)
      pageContext.drawImage(
        canvas,
        0,
        offsetY,
        canvas.width,
        sliceHeight,
        0,
        0,
        canvas.width,
        sliceHeight
      )

      if (pageIndex > 0) pdf.addPage()

      const sliceHeightMm = sliceHeight / pixelsPerMm
      pdf.addImage(
        pageCanvas.toDataURL('image/png'),
        'PNG',
        PDF_MARGIN,
        PDF_MARGIN,
        contentWidthMm,
        sliceHeightMm,
        undefined,
        'FAST'
      )

      offsetY = endY
      pageIndex++
    }

    // 4. 触发浏览器下载
    pdf.save(buildPdfFileName())

    showStatus('success', `PDF 导出完成（共 ${pageIndex} 页），已开始下载`)
  } catch (err) {
    console.error('PDF 导出失败:', err)
    showStatus(
      'error',
      'PDF 导出失败：' + (err && err.message ? err.message : '未知错误'),
      6000
    )
  } finally {
    isExporting.value = false
  }
}

watch(content, () => {
  if (!debounceTimer) {
    htmlContent.value = renderMarkdown(content.value)
  }
})

onMounted(() => {
  htmlContent.value = renderMarkdown(content.value)
})

onUnmounted(() => {
  if (debounceTimer) clearTimeout(debounceTimer)
  if (scrollTimeout) clearTimeout(scrollTimeout)
  if (statusTimer) clearTimeout(statusTimer)
})
</script>

<style>
/* ------------------------------------------------------------------
    Markdown 渲染内容的通用样式
   预览区与 PDF 导出容器共用，保证导出效果与预览一致
   ------------------------------------------------------------------ */
.markdown-body {
  color: var(--text-color);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-size: 0.95rem;
  line-height: 1.8;
  word-wrap: break-word;
}

.markdown-body h1 {
  font-size: 2rem;
  font-weight: 700;
  margin: 1.5rem 0 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--glass-border);
  background: var(--gradient-primary);
  background-clip: text;
}

.markdown-body h2 {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 1.25rem 0 0.75rem;
  color: #f1f5f9;
}

.markdown-body h3 {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 1rem 0 0.5rem;
  color: #e2e8f0;
}

.markdown-body h4,
.markdown-body h5,
.markdown-body h6 {
  font-size: 1rem;
  font-weight: 600;
  margin: 0.75rem 0 0.5rem;
  color: #cbd5e1;
}

.markdown-body p {
  margin: 0.75rem 0;
}

.markdown-body a {
  color: var(--secondary-color);
  text-decoration: none;
  border-bottom: 1px solid transparent;
  transition: all var(--transition-normal);
}

.markdown-body a:hover {
  border-bottom-color: var(--secondary-color);
}

.markdown-body strong {
  font-weight: 600;
  color: #f1f5f9;
}

.markdown-body em {
  font-style: italic;
  color: #cbd5e1;
}

.markdown-body s {
  text-decoration: line-through;
  color: #64748b;
}

.markdown-body ul,
.markdown-body ol {
  padding-left: 1.5rem;
  margin: 0.75rem 0;
}

.markdown-body li {
  margin: 0.25rem 0;
}

.markdown-body blockquote {
  border-left: 4px solid var(--primary-color);
  margin: 1rem 0;
  color: var(--text-secondary);
  background: rgba(124, 58, 237, 0.05);
  padding: 0.75rem 1rem;
  border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
}

.markdown-body code {
  background: rgba(255, 255, 255, 0.08);
  padding: 0.15rem 0.4rem;
  border-radius: 4px;
  font-family: 'Fira Code', 'Cascadia Code', monospace;
  font-size: 0.85em;
  color: #f87171;
}

.markdown-body pre {
  background: rgba(0, 0, 0, 0.4);
  padding: 1rem;
  border-radius: var(--radius-md);
  overflow-x: auto;
  margin: 1rem 0;
  border: 1px solid var(--glass-border);
}

.markdown-body pre code {
  background: none;
  padding: 0;
  color: #e2e8f0;
  font-size: 0.875rem;
  line-height: 1.6;
}

.markdown-body table {
  width: 100%;
  border-collapse: collapse;
  margin: 1rem 0;
  font-size: 0.9rem;
}

.markdown-body th,
.markdown-body td {
  border: 1px solid var(--glass-border);
  padding: 0.75rem;
  text-align: left;
}

.markdown-body th {
  background: rgba(124, 58, 237, 0.1);
  font-weight: 600;
  color: #f1f5f9;
}

.markdown-body td {
  color: var(--text-secondary);
}

.markdown-body tr:nth-child(even) {
  background: rgba(255, 255, 255, 0.02);
}

.markdown-body hr {
  border: none;
  border-top: 1px solid var(--glass-border);
  margin: 2rem 0;
}

.markdown-body img {
  max-width: 100%;
  height: auto;
  border-radius: var(--radius-sm);
  margin: 1rem 0;
}

.markdown-body input[type='checkbox'] {
  margin-right: 0.5rem;
  vertical-align: middle;
}

/* ------------------------------------------------------------------
   PDF 导出专用样式
   ------------------------------------------------------------------ */
.pdf-export {
  position: fixed;
  top: 0;
  left: 0;
  width: 700px;
  padding: 0;
  background: #ffffff;
  pointer-events: none;
  z-index: 1;
}

.pdf-markdown {
  padding: 0;
  overflow: visible;
  /* PDF 使用白色纸张主题 */
  color: #1f2937;
  background: #ffffff;
}

/* html2canvas 无法渲染背景裁剪的文字，导出时改为纯色以保证可读 */
.pdf-markdown h1 {
  background: none;
  color: #000000;
  border-bottom: 1px solid #e5e7eb;
}

.pdf-markdown h2 {
  color: #111827;
}

.pdf-markdown h3 {
  color: #1f2937;
}

.pdf-markdown h4,
.pdf-markdown h5,
.pdf-markdown h6 {
  color: #374151;
}

.pdf-markdown strong {
  color: #111827;
}

.pdf-markdown em {
  color: #374151;
}

.pdf-markdown s {
  color: #9ca3af;
}

.pdf-markdown a {
  color: #2563eb;
}

.pdf-markdown code {
  background: #f3f4f6;
  color: #b91c1c;
}

.pdf-markdown pre {
  background: #f6f8fa;
  border: 1px solid #e5e7eb;
}

.pdf-markdown pre code {
  background: none;
  color: #24292f;
}

.pdf-markdown blockquote {
  background: #f5f3ff;
  color: #4b5563;
  border-left-color: #7c3aed;
}

.pdf-markdown th {
  background: #f5f3ff;
  color: #111827;
}

.pdf-markdown th,
.pdf-markdown td {
  border-color: #e5e7eb;
}

.pdf-markdown td {
  color: #374151;
}

.pdf-markdown tr:nth-child(even) {
  background: #fafafa;
}

.pdf-markdown hr {
  border-top-color: #e5e7eb;
}

.pdf-markdown h2,
.pdf-markdown h3,
.pdf-markdown h4,
.pdf-markdown h5,
.pdf-markdown h6 {
  page-break-after: avoid;
  break-after: avoid;
}

/* 分页控制：避免段落、列表、代码块、表格行等被切断 */
.pdf-markdown p,
.pdf-markdown li,
.pdf-markdown pre,
.pdf-markdown blockquote,
.pdf-markdown img,
.pdf-markdown tr {
  page-break-inside: avoid;
  break-inside: avoid;
}

/* 长代码与宽表格自动折行，避免内容横向被截断 */
.pdf-markdown pre code {
  white-space: pre-wrap;
  word-break: break-word;
  overflow-wrap: anywhere;
}

.pdf-markdown table {
  table-layout: fixed;
}

.pdf-markdown th,
.pdf-markdown td {
  word-break: break-word;
  overflow-wrap: anywhere;
}
</style>

<style scoped>
.markdown-preview {
  padding: var(--spacing-lg);
  max-width: 1600px;
  margin: 0 auto;
  animation: fadeIn 0.5s ease;
}

.page-title {
  font-size: 2rem;
  margin-bottom: var(--spacing-lg);
  text-align: center;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.toolbar {
  display: flex;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-md);
  flex-wrap: wrap;
  justify-content: center;
}

.tool-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.6rem 1.4rem;
  border-radius: var(--radius-full);
  background: var(--gradient-primary);
  color: #fff;
  font-size: 0.9rem;
  font-weight: 500;
  letter-spacing: 0.02em;
  box-shadow: var(--glow-primary);
  transition: all var(--transition-normal);
  cursor: pointer;
}

.tool-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: var(--glow-hover);
}

.tool-btn:active:not(:disabled) {
  transform: translateY(0);
}

.tool-btn:disabled {
  cursor: not-allowed;
  opacity: 0.7;
  box-shadow: none;
}

.btn-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  min-width: 1rem;
  min-height: 1rem;
}

/* 按钮内的小型加载动画 */
.spinner-small {
  display: inline-block;
  width: 14px;
  height: 14px;
  border: 2px solid rgba(255, 255, 255, 0.35);
  border-top-color: #fff;
  border-radius: 50%;
  animation: exportSpin 0.8s linear infinite;
}

.status-hint {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1rem;
  border-radius: var(--radius-sm);
  margin-bottom: var(--spacing-md);
  font-size: 0.85rem;
  animation: fadeIn 0.3s ease;
}

.status-hint.success {
  background: rgba(34, 197, 94, 0.1);
  border: 1px solid rgba(34, 197, 94, 0.3);
  color: #4ade80;
}

.status-hint.error {
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.3);
  color: #f87171;
}

.status-icon {
  font-size: 1rem;
}

.error-hint {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1rem;
  border-radius: var(--radius-sm);
  margin-bottom: var(--spacing-md);
  font-size: 0.85rem;
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.3);
  color: #f87171;
  animation: fadeIn 0.3s ease;
}

.error-icon {
  font-size: 1rem;
}

.editor-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-md);
}

.editor-panel,
.preview-panel {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: calc(100vh - 280px);
}

.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.8rem 1.2rem;
  border-bottom: 1px solid var(--glass-border);
}

.panel-label {
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--text-secondary);
}

.panel-count {
  font-size: 0.75rem;
  color: var(--text-tertiary);
  font-variant-numeric: tabular-nums;
}

.code-textarea {
  width: 100%;
  flex: 1;
  padding: 1.2rem;
  background: rgba(0, 0, 0, 0.3);
  color: #e2e8f0;
  font-family: 'Fira Code', 'Cascadia Code', 'JetBrains Mono', 'Consolas', monospace;
  font-size: 0.875rem;
  line-height: 1.7;
  resize: none;
  border: 2px solid transparent;
  border-radius: 0 0 var(--radius-md) var(--radius-md);
  transition: border-color var(--transition-normal), box-shadow var(--transition-normal);
  tab-size: 2;
}

.code-textarea::placeholder {
  color: var(--text-tertiary);
}

.code-textarea:focus {
  border-color: var(--primary-color);
  box-shadow: inset 0 0 10px rgba(124, 58, 237, 0.15);
}

.preview-content {
  flex: 1;
  overflow-y: auto;
  padding: 1.2rem;
}

/* 导出加载遮罩 */
.export-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(10, 10, 26, 0.78);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
}

.export-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 2rem 2.5rem;
  border-radius: var(--radius-lg);
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid var(--glass-border);
  box-shadow: var(--glass-shadow);
}

.export-spinner {
  width: 44px;
  height: 44px;
  border: 3px solid rgba(124, 58, 237, 0.25);
  border-top-color: var(--primary-color);
  border-radius: 50%;
  animation: exportSpin 0.9s linear infinite;
}

.export-title {
  font-size: 1.05rem;
  font-weight: 600;
  color: var(--text-color);
}

.export-subtitle {
  font-size: 0.85rem;
  color: var(--text-secondary);
}

@keyframes exportSpin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 767px) {
  .markdown-preview {
    padding: var(--spacing-sm);
  }

  .page-title {
    font-size: 1.5rem;
  }

  .editor-layout {
    grid-template-columns: 1fr;
  }

  .editor-panel,
  .preview-panel {
    height: 400px;
  }

  .toolbar {
    gap: 0.5rem;
  }

  .tool-btn {
    padding: 0.5rem 1rem;
    font-size: 0.8rem;
  }

  .code-textarea {
    font-size: 0.8rem;
  }

  .preview-content {
    font-size: 0.9rem;
  }

  .export-card {
    padding: 1.5rem;
    margin: 0 1rem;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>

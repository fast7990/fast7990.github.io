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
    </div>

    <!-- 错误提示 -->
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
          class="preview-content"
          @scroll="handlePreviewScroll"
          v-html="htmlContent"
        ></div>
      </GlassContainer>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'
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
let scrollTimeout = null
let isSyncing = false

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

  if (source === 'editor') {
    const editorScrollPercent = editor.scrollTop / (editor.scrollHeight - editor.clientHeight)
    preview.scrollTop = editorScrollPercent * (preview.scrollHeight - preview.clientHeight)
  } else {
    const previewScrollPercent = preview.scrollTop / (preview.scrollHeight - preview.clientHeight)
    editor.scrollTop = previewScrollPercent * (editor.scrollHeight - editor.clientHeight)
  }
}

async function handleClear() {
  content.value = ''
  htmlContent.value = ''
  error.value = ''
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
})
</script>

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

.tool-btn:hover {
  transform: translateY(-2px);
  box-shadow: var(--glow-hover);
}

.tool-btn:active {
  transform: translateY(0);
}

.btn-icon {
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
  color: var(--text-color);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-size: 0.95rem;
  line-height: 1.8;
}

.preview-content :deep(h1) {
  font-size: 2rem;
  font-weight: 700;
  margin: 1.5rem 0 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--glass-border);
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.preview-content :deep(h2) {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 1.25rem 0 0.75rem;
  color: #f1f5f9;
}

.preview-content :deep(h3) {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 1rem 0 0.5rem;
  color: #e2e8f0;
}

.preview-content :deep(h4),
.preview-content :deep(h5),
.preview-content :deep(h6) {
  font-size: 1rem;
  font-weight: 600;
  margin: 0.75rem 0 0.5rem;
  color: #cbd5e1;
}

.preview-content :deep(p) {
  margin: 0.75rem 0;
}

.preview-content :deep(a) {
  color: var(--secondary-color);
  text-decoration: none;
  border-bottom: 1px solid transparent;
  transition: all var(--transition-normal);
}

.preview-content :deep(a:hover) {
  border-bottom-color: var(--secondary-color);
}

.preview-content :deep(strong) {
  font-weight: 600;
  color: #f1f5f9;
}

.preview-content :deep(em) {
  font-style: italic;
  color: #cbd5e1;
}

.preview-content :deep(s) {
  text-decoration: line-through;
  color: #64748b;
}

.preview-content :deep(ul),
.preview-content :deep(ol) {
  padding-left: 1.5rem;
  margin: 0.75rem 0;
}

.preview-content :deep(li) {
  margin: 0.25rem 0;
}

.preview-content :deep(blockquote) {
  border-left: 4px solid var(--primary-color);
  padding-left: 1rem;
  margin: 1rem 0;
  color: var(--text-secondary);
  background: rgba(124, 58, 237, 0.05);
  padding: 0.75rem 1rem;
  border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
}

.preview-content :deep(code) {
  background: rgba(255, 255, 255, 0.08);
  padding: 0.15rem 0.4rem;
  border-radius: 4px;
  font-family: 'Fira Code', 'Cascadia Code', monospace;
  font-size: 0.85em;
  color: #f87171;
}

.preview-content :deep(pre) {
  background: rgba(0, 0, 0, 0.4);
  padding: 1rem;
  border-radius: var(--radius-md);
  overflow-x: auto;
  margin: 1rem 0;
  border: 1px solid var(--glass-border);
}

.preview-content :deep(pre code) {
  background: none;
  padding: 0;
  color: #e2e8f0;
  font-size: 0.875rem;
  line-height: 1.6;
}

.preview-content :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin: 1rem 0;
  font-size: 0.9rem;
}

.preview-content :deep(th),
.preview-content :deep(td) {
  border: 1px solid var(--glass-border);
  padding: 0.75rem;
  text-align: left;
}

.preview-content :deep(th) {
  background: rgba(124, 58, 237, 0.1);
  font-weight: 600;
  color: #f1f5f9;
}

.preview-content :deep(td) {
  color: var(--text-secondary);
}

.preview-content :deep(tr:nth-child(even)) {
  background: rgba(255, 255, 255, 0.02);
}

.preview-content :deep(hr) {
  border: none;
  border-top: 1px solid var(--glass-border);
  margin: 2rem 0;
}

.preview-content :deep(img) {
  max-width: 100%;
  height: auto;
  border-radius: var(--radius-sm);
  margin: 1rem 0;
}

.preview-content :deep(input[type="checkbox"]) {
  margin-right: 0.5rem;
  vertical-align: middle;
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

<template>
  <div class="json-formatter">
    <h1 class="page-title">JSON 格式化</h1>

    <!-- 工具栏 -->
    <div class="toolbar">
      <button class="tool-btn" @click="handleFormat">
        <span class="btn-icon">✨</span>
        <span class="btn-text">格式化</span>
      </button>
      <button class="tool-btn" @click="handleCompress">
        <span class="btn-icon">📦</span>
        <span class="btn-text">压缩</span>
      </button>
      <button class="tool-btn" @click="handleCopy">
        <span class="btn-icon">📋</span>
        <span class="btn-text">{{ copied ? '已复制' : '复制' }}</span>
      </button>
      <button class="tool-btn tool-btn--danger" @click="handleClear">
        <span class="btn-icon">🗑️</span>
        <span class="btn-text">清空</span>
      </button>
    </div>

    <!-- 校验状态提示 -->
    <div v-if="validationMessage" class="validation-hint" :class="validationStatus">
      <span class="hint-icon">{{ validationStatus === 'valid' ? '✓' : '✗' }}</span>
      <span class="hint-text">{{ validationMessage }}</span>
    </div>

    <!-- 双栏布局 -->
    <div class="editor-layout">
      <!-- 左侧输入区 -->
      <GlassContainer class="editor-panel">
        <div class="panel-header">
          <span class="panel-label">输入</span>
          <span class="panel-count">{{ inputText.length }} 字符</span>
        </div>
        <textarea
          v-model="inputText"
          class="code-textarea"
          :class="{ 'is-valid': isValidJson && inputText.trim(), 'is-invalid': !isValidJson && inputText.trim() }"
          placeholder="在此粘贴 JSON 内容..."
          spellcheck="false"
          @input="onInputChange"
        ></textarea>
      </GlassContainer>

      <!-- 右侧输出区 -->
      <GlassContainer class="editor-panel">
        <div class="panel-header">
          <span class="panel-label">输出</span>
          <span class="panel-count">{{ outputText.length }} 字符</span>
        </div>
        <textarea
          :value="outputText"
          class="code-textarea"
          placeholder="格式化结果将显示在这里..."
          readonly
          spellcheck="false"
        ></textarea>
      </GlassContainer>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import GlassContainer from '../components/GlassContainer.vue'
import { useClipboard } from '../composables/useClipboard.js'

const inputText = ref('')
const outputText = ref('')
const parseError = ref('')
const hasParsed = ref(false)

const { copied, copy } = useClipboard()

/**
 * 判断输入是否为合法 JSON
 */
const isValidJson = computed(() => {
  if (!inputText.value.trim()) return false
  return parseError.value === ''
})

/**
 * 校验状态文本
 */
const validationMessage = computed(() => {
  if (!inputText.value.trim()) return ''
  if (parseError.value) return parseError.value
  return 'JSON 格式正确'
})

/**
 * 校验状态类名
 */
const validationStatus = computed(() => {
  if (!inputText.value.trim()) return ''
  return parseError.value ? 'invalid' : 'valid'
})

/**
 * 输入变化时实时校验
 */
function onInputChange() {
  const text = inputText.value.trim()
  if (!text) {
    parseError.value = ''
    hasParsed.value = false
    return
  }
  try {
    JSON.parse(text)
    parseError.value = ''
    hasParsed.value = true
  } catch (err) {
    parseError.value = err.message
    hasParsed.value = false
  }
}

/**
 * 格式化 JSON：美化输出，2 空格缩进
 */
function handleFormat() {
  const text = inputText.value.trim()
  if (!text) return
  try {
    const parsed = JSON.parse(text)
    outputText.value = JSON.stringify(parsed, null, 2)
  } catch (err) {
    outputText.value = ''
    alert('JSON 格式错误，无法格式化：\n' + err.message)
  }
}

/**
 * 压缩 JSON：输出为单行
 */
function handleCompress() {
  const text = inputText.value.trim()
  if (!text) return
  try {
    const parsed = JSON.parse(text)
    outputText.value = JSON.stringify(parsed)
  } catch (err) {
    outputText.value = ''
    alert('JSON 格式错误，无法压缩：\n' + err.message)
  }
}

/**
 * 复制输出区内容
 */
async function handleCopy() {
  if (!outputText.value) {
    alert('输出区为空，无内容可复制')
    return
  }
  await copy(outputText.value)
}

/**
 * 清空输入和输出
 */
function handleClear() {
  inputText.value = ''
  outputText.value = ''
  parseError.value = ''
  hasParsed.value = false
}
</script>

<style scoped>
.json-formatter {
  padding: var(--spacing-lg);
  max-width: 1400px;
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

/* 工具栏 */
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

.tool-btn--danger {
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
  box-shadow: 0 0 20px rgba(239, 68, 68, 0.4);
}

.tool-btn--danger:hover {
  box-shadow: 0 0 30px rgba(239, 68, 68, 0.7);
}

.btn-icon {
  font-size: 1rem;
}

/* 校验状态提示 */
.validation-hint {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1rem;
  border-radius: var(--radius-sm);
  margin-bottom: var(--spacing-md);
  font-size: 0.85rem;
  animation: fadeIn 0.3s ease;
}

.validation-hint.valid {
  background: rgba(34, 197, 94, 0.1);
  border: 1px solid rgba(34, 197, 94, 0.3);
  color: #4ade80;
}

.validation-hint.invalid {
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.3);
  color: #f87171;
}

.hint-icon {
  font-size: 1rem;
  font-weight: bold;
}

/* 双栏布局 */
.editor-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-md);
}

.editor-panel {
  display: flex;
  flex-direction: column;
  overflow: hidden;
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

/* 代码文本域 */
.code-textarea {
  width: 100%;
  min-height: 420px;
  padding: 1.2rem;
  background: rgba(0, 0, 0, 0.3);
  color: #e2e8f0;
  font-family: 'Fira Code', 'Cascadia Code', 'JetBrains Mono', 'Consolas', monospace;
  font-size: 0.875rem;
  line-height: 1.7;
  resize: vertical;
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

.code-textarea.is-valid {
  border-color: rgba(34, 197, 94, 0.5);
  box-shadow: inset 0 0 10px rgba(34, 197, 94, 0.08);
}

.code-textarea.is-invalid {
  border-color: rgba(239, 68, 68, 0.5);
  box-shadow: inset 0 0 10px rgba(239, 68, 68, 0.08);
}

.code-textarea[readonly] {
  cursor: default;
  opacity: 0.9;
}

.code-textarea[readonly]:focus {
  border-color: transparent;
  box-shadow: none;
}

/* 响应式：移动端上下堆叠 */
@media (max-width: 767px) {
  .json-formatter {
    padding: var(--spacing-sm);
  }

  .page-title {
    font-size: 1.5rem;
  }

  .editor-layout {
    grid-template-columns: 1fr;
  }

  .code-textarea {
    min-height: 260px;
  }

  .toolbar {
    gap: 0.5rem;
  }

  .tool-btn {
    padding: 0.5rem 1rem;
    font-size: 0.8rem;
  }
}
</style>

<template>
  <div class="image-to-base64">
    <h1 class="page-title">图片转 Base64</h1>
    
    <GlassContainer class="main-container">
      <!-- 拖拽上传区域 -->
      <div 
        class="upload-area"
        :class="{ 'drag-over': isDragOver }"
        @dragenter.prevent="handleDragEnter"
        @dragover.prevent="handleDragOver"
        @dragleave.prevent="handleDragLeave"
        @drop.prevent="handleDrop"
        @click="triggerFileInput"
      >
        <input 
          ref="fileInput"
          type="file" 
          accept="image/png,image/jpeg,image/gif,image/webp,image/svg+xml,image/x-icon"
          @change="handleFileSelect"
          class="file-input"
        />
        <div class="upload-content">
          <svg class="upload-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/>
          </svg>
          <p class="upload-text">拖拽图片到此处或点击选择</p>
          <p class="upload-hint">支持 PNG、JPG、GIF、WebP、SVG、ICO 格式</p>
        </div>
      </div>

      <!-- 图片预览和文件信息 -->
      <div v-if="imageInfo" class="preview-section">
        <div class="preview-header">
          <h3>图片预览</h3>
          <button class="btn-clear" @click="clearImage">清除</button>
        </div>
        <div class="preview-content">
          <img :src="imagePreview" alt="预览图" class="preview-image" />
          <div class="file-info">
            <div class="info-item">
              <span class="info-label">文件名</span>
              <span class="info-value">{{ imageInfo.name }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">大小</span>
              <span class="info-value">{{ formatFileSize(imageInfo.size) }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">尺寸</span>
              <span class="info-value">{{ imageInfo.width }} × {{ imageInfo.height }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">格式</span>
              <span class="info-value">{{ imageInfo.type }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Base64 输出区域 -->
      <div v-if="base64Result" class="output-section">
        <div class="output-header">
          <h3>Base64 输出</h3>
          <div class="output-controls">
            <label class="toggle-label">
              <input type="checkbox" v-model="showPureBase64" />
              <span>纯 Base64（不含前缀）</span>
            </label>
          </div>
        </div>
        <textarea 
          class="base64-output" 
          :value="displayBase64" 
          readonly
          rows="8"
        ></textarea>
        <div class="output-actions">
          <button 
            class="btn-copy" 
            :class="{ 'copied': copied }"
            @click="copyBase64"
          >
            {{ copied ? '已复制' : '复制 Base64' }}
          </button>
          <span class="char-count">{{ displayBase64.length }} 字符</span>
        </div>
      </div>
    </GlassContainer>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import GlassContainer from '../components/GlassContainer.vue'
import { useClipboard } from '../composables/useClipboard.js'

const fileInput = ref(null)
const isDragOver = ref(false)
const imageInfo = ref(null)
const imagePreview = ref('')
const base64Result = ref('')
const showPureBase64 = ref(false)

const { copied, copy } = useClipboard()

// 计算显示的 Base64 字符串
const displayBase64 = computed(() => {
  if (!base64Result.value) return ''
  if (showPureBase64.value) {
    // 移除 data:image/xxx;base64, 前缀
    return base64Result.value.replace(/^data:image\/[^;]+;base64,/, '')
  }
  return base64Result.value
})

// 触发文件选择
const triggerFileInput = () => {
  fileInput.value?.click()
}

// 处理文件选择
const handleFileSelect = (event) => {
  const file = event.target.files[0]
  if (file) {
    processFile(file)
  }
}

// 处理拖拽进入
const handleDragEnter = () => {
  isDragOver.value = true
}

// 处理拖拽悬停
const handleDragOver = () => {
  isDragOver.value = true
}

// 处理拖拽离开
const handleDragLeave = () => {
  isDragOver.value = false
}

// 处理拖放
const handleDrop = (event) => {
  isDragOver.value = false
  const files = event.dataTransfer.files
  if (files.length > 0) {
    const file = files[0]
    if (file.type.startsWith('image/')) {
      processFile(file)
    }
  }
}

// 处理文件
const processFile = (file) => {
  // 验证文件类型
  const validTypes = ['image/png', 'image/jpeg', 'image/gif', 'image/webp', 'image/svg+xml', 'image/x-icon']
  if (!validTypes.includes(file.type)) {
    alert('不支持的图片格式，请上传 PNG、JPG、GIF、WebP、SVG 或 ICO 格式的图片')
    return
  }

  // 获取图片尺寸
  const img = new Image()
  const url = URL.createObjectURL(file)
  console.log(url)
  img.onload = () => {
    imageInfo.value = {
      name: file.name,
      size: file.size,
      type: file.type.split('/')[1].toUpperCase(),
      width: img.width,
      height: img.height
    }
    imagePreview.value = url
    
    // 读取为 Base64
    const reader = new FileReader()
    reader.onload = (e) => {
      base64Result.value = e.target.result
    }
    reader.readAsDataURL(file)
  }
  
  img.onerror = () => {
    URL.revokeObjectURL(url)
    alert('无法读取图片信息')
  }
  
  img.src = url
}

// 复制 Base64
const copyBase64 = async () => {
  await copy(displayBase64.value)
}

// 清除图片
const clearImage = () => {
  if (imagePreview.value) {
    URL.revokeObjectURL(imagePreview.value)
  }
  imageInfo.value = null
  imagePreview.value = ''
  base64Result.value = ''
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

// 格式化文件大小
const formatFileSize = (bytes) => {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB'
  return (bytes / (1024 * 1024)).toFixed(2) + ' MB'
}
</script>

<style scoped>
.image-to-base64 {
  padding: 2rem;
  max-width: 900px;
  margin: 0 auto;
}

.page-title {
  font-size: 2rem;
  margin-bottom: 1.5rem;
  text-align: center;
  background: linear-gradient(135deg, #7c3aed 0%, #06b6d4 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.main-container {
  padding: 2rem;
}

/* 拖拽上传区域 */
.upload-area {
  border: 2px dashed rgba(255, 255, 255, 0.3);
  border-radius: 12px;
  padding: 3rem 2rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.02);
}

.upload-area:hover {
  border-color: rgba(124, 58, 237, 0.6);
  background: rgba(124, 58, 237, 0.05);
}

.upload-area.drag-over {
  border-color: #7c3aed;
  background: rgba(124, 58, 237, 0.1);
  box-shadow: 0 0 20px rgba(124, 58, 237, 0.3);
}

.file-input {
  display: none;
}

.upload-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.upload-icon {
  width: 48px;
  height: 48px;
  color: rgba(255, 255, 255, 0.5);
}

.upload-text {
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.8);
}

.upload-hint {
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.5);
}

/* 预览区域 */
.preview-section {
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.preview-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.preview-header h3 {
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.9);
}

.btn-clear {
  padding: 0.5rem 1rem;
  background: rgba(239, 68, 68, 0.2);
  color: #ef4444;
  border-radius: 6px;
  font-size: 0.875rem;
  transition: all 0.3s ease;
}

.btn-clear:hover {
  background: rgba(239, 68, 68, 0.3);
}

.preview-content {
  display: flex;
  gap: 2rem;
  align-items: flex-start;
}

.preview-image {
  max-width: 300px;
  max-height: 200px;
  border-radius: 8px;
  object-fit: contain;
  background: rgba(255, 255, 255, 0.05);
}

.file-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.info-item {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.info-label {
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.875rem;
}

.info-value {
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.875rem;
  word-break: break-all;
}

/* Base64 输出区域 */
.output-section {
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.output-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.output-header h3 {
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.9);
}

.output-controls {
  display: flex;
  align-items: center;
}

.toggle-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.7);
}

.toggle-label input[type="checkbox"] {
  width: 16px;
  height: 16px;
  cursor: pointer;
  accent-color: #7c3aed;
}

.base64-output {
  width: 100%;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: rgba(255, 255, 255, 0.8);
  font-family: 'Consolas', 'Monaco', monospace;
  font-size: 0.8rem;
  resize: vertical;
  min-height: 120px;
}

.output-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;
}

.btn-copy {
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #7c3aed 0%, #06b6d4 100%);
  color: white;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(124, 58, 237, 0.3);
}

.btn-copy:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(124, 58, 237, 0.4);
}

.btn-copy.copied {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);
}

.char-count {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.5);
}

/* 响应式布局 */
@media (max-width: 768px) {
  .image-to-base64 {
    padding: 1rem;
  }
  
  .main-container {
    padding: 1.5rem;
  }
  
  .upload-area {
    padding: 2rem 1rem;
  }
  
  .preview-content {
    flex-direction: column;
  }
  
  .preview-image {
    max-width: 100%;
  }
  
  .output-header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .output-actions {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .btn-copy {
    width: 100%;
  }
}
</style>

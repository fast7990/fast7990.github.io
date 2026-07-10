<template>
  <div class="qrcode-generator">
    <h1 class="page-title">二维码生成器</h1>
    
    <div class="container">
      <!-- 左侧配置面板 -->
      <GlassContainer class="config-panel">
        <h2 class="section-title">配置选项</h2>
        
        <div class="form-group">
          <label class="form-label">内容输入</label>
          <textarea
            v-model="content"
            class="form-textarea"
            placeholder="输入文本或 URL..."
            rows="4"
          ></textarea>
        </div>

        <div class="form-group">
          <label class="form-label">尺寸</label>
          <select v-model="size" class="form-select">
            <option value="128">128px</option>
            <option value="256">256px</option>
            <option value="512">512px</option>
            <option value="1024">1024px</option>
          </select>
        </div>

        <div class="form-group">
          <label class="form-label">前景色</label>
          <div class="color-input-wrapper">
            <input
              type="color"
              v-model="foregroundColor"
              class="form-color"
            />
            <span class="color-value">{{ foregroundColor }}</span>
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">背景色</label>
          <div class="color-input-wrapper">
            <input
              type="color"
              v-model="backgroundColor"
              class="form-color"
            />
            <span class="color-value">{{ backgroundColor }}</span>
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">容错级别</label>
          <select v-model="errorCorrectionLevel" class="form-select">
            <option value="L">L (7%)</option>
            <option value="M">M (15%)</option>
            <option value="Q">Q (25%)</option>
            <option value="H">H (30%)</option>
          </select>
        </div>

        <button @click="downloadQRCode" class="download-btn glow-btn" :disabled="!qrcodeDataUrl">
          下载二维码
        </button>
      </GlassContainer>

      <!-- 右侧预览面板 -->
      <GlassContainer class="preview-panel">
        <h2 class="section-title">二维码预览</h2>
        
        <div class="preview-container">
          <div v-if="loading" class="loading-state">
            <div class="spinner"></div>
            <p>生成中...</p>
          </div>
          
          <div v-else-if="qrcodeDataUrl" class="qrcode-wrapper">
            <img :src="qrcodeDataUrl" alt="QR Code" class="qrcode-image" />
          </div>
          
          <div v-else class="empty-state">
            <p>请输入内容以生成二维码</p>
          </div>
        </div>
      </GlassContainer>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import QRCode from 'qrcode'
import GlassContainer from '../components/GlassContainer.vue'

// 响应式状态
const content = ref('')
const size = ref('256')
const foregroundColor = ref('#000000')
const backgroundColor = ref('#ffffff')
const errorCorrectionLevel = ref('M')
const qrcodeDataUrl = ref('')
const loading = ref(false)

// 生成二维码
const generateQRCode = async () => {
  if (!content.value.trim()) {
    qrcodeDataUrl.value = ''
    return
  }

  loading.value = true
  try {
    const options = {
      width: parseInt(size.value),
      color: {
        dark: foregroundColor.value,
        light: backgroundColor.value
      },
      errorCorrectionLevel: errorCorrectionLevel.value
    }
    
    qrcodeDataUrl.value = await QRCode.toDataURL(content.value, options)
  } catch (err) {
    console.error('生成二维码失败:', err)
    qrcodeDataUrl.value = ''
  } finally {
    loading.value = false
  }
}

// 下载二维码
const downloadQRCode = () => {
  if (!qrcodeDataUrl.value) return
  
  const link = document.createElement('a')
  link.download = `qrcode-${Date.now()}.png`
  link.href = qrcodeDataUrl.value
  link.click()
}

// 监听配置变化，重新生成二维码
watch(
  [content, size, foregroundColor, backgroundColor, errorCorrectionLevel],
  () => {
    generateQRCode()
  },
  { immediate: true }
)
</script>

<style scoped>
.qrcode-generator {
  padding: 2rem;
  min-height: 100vh;
}

.page-title {
  font-size: 2.5rem;
  margin-bottom: 2rem;
  text-align: center;
  background: linear-gradient(135deg, #7c3aed 0%, #06b6d4 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

@media (max-width: 768px) {
  .container {
    grid-template-columns: 1fr;
  }
}

.config-panel,
.preview-panel {
  padding: 2rem;
}

.section-title {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: rgba(255, 255, 255, 0.9);
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-label {
  display: block;
  margin-bottom: 0.5rem;
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.95rem;
}

.form-textarea,
.form-select {
  width: 100%;
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: #ffffff;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.form-textarea:focus,
.form-select:focus {
  background: rgba(255, 255, 255, 0.08);
  border-color: #7c3aed;
}

.form-textarea {
  resize: vertical;
  min-height: 100px;
  font-family: inherit;
}

.form-select {
  cursor: pointer;
}

.form-select option {
  background: #1a1a2e;
  color: #ffffff;
}

.color-input-wrapper {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.form-color {
  width: 60px;
  height: 40px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  cursor: pointer;
  background: transparent;
}

.form-color::-webkit-color-swatch-wrapper {
  padding: 0;
}

.form-color::-webkit-color-swatch {
  border: none;
  border-radius: 6px;
}

.color-value {
  color: rgba(255, 255, 255, 0.7);
  font-family: monospace;
  font-size: 0.9rem;
}

.download-btn {
  width: 100%;
  padding: 1rem;
  margin-top: 1rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.glow-btn {
  background: linear-gradient(135deg, #7c3aed 0%, #06b6d4 100%);
  color: #ffffff;
}

.glow-btn:hover:not(:disabled) {
  animation: glow 2s ease-in-out infinite;
}

.glow-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

@keyframes glow {
  0%, 100% {
    box-shadow: 0 0 5px rgba(124, 58, 237, 0.5);
  }
  50% {
    box-shadow: 0 0 20px rgba(124, 58, 237, 0.8), 0 0 40px rgba(6, 182, 212, 0.4);
  }
}

.preview-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  padding: 2rem;
}

.loading-state,
.empty-state {
  text-align: center;
  color: rgba(255, 255, 255, 0.5);
}

.spinner {
  width: 40px;
  height: 40px;
  border: 3px solid rgba(255, 255, 255, 0.1);
  border-top-color: #7c3aed;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.qrcode-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}

.qrcode-image {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.empty-state p {
  font-size: 1.1rem;
}
</style>

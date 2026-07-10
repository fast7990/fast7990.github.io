<template>
  <div class="experiment-page">
    <div class="experiment-header">
      <div class="back-link" @click="goBack">← 返回实验列表</div>
      <h1 class="page-title">🌈 渐变色彩生成器</h1>
      <p class="page-desc">随机生成美丽的渐变色彩方案，可导出 CSS 代码</p>
    </div>

    <GlassContainer class="experiment-container">
      <div class="preview-panel">
        <div class="gradient-preview" :style="{ background: currentGradient }"></div>
        <div class="gradient-info">
          <div class="info-item">
            <span class="info-label">渐变类型</span>
            <span class="info-value">{{ gradientType }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">颜色数量</span>
            <span class="info-value">{{ colors.length }}</span>
          </div>
        </div>
      </div>

      <div class="controls">
        <h3 class="controls-title">参数调节</h3>
        
        <div class="control-group">
          <label class="control-label">渐变类型</label>
          <select v-model="gradientType" class="control-select">
            <option value="linear-gradient">线性渐变</option>
            <option value="radial-gradient">径向渐变</option>
            <option value="conic-gradient">锥形渐变</option>
          </select>
        </div>

        <div class="control-group">
          <label class="control-label">颜色数量</label>
          <input type="range" v-model.number="colorCount" min="2" max="6" step="1" />
          <span class="control-value">{{ colorCount }}</span>
        </div>

        <div class="control-group">
          <label class="control-label">角度 (线性渐变)</label>
          <input type="range" v-model.number="angle" min="0" max="360" step="15" />
          <span class="control-value">{{ angle }}°</span>
        </div>

        <div class="control-group">
          <label class="control-label">颜色列表</label>
          <div class="color-list">
            <div 
              v-for="(color, index) in colors" 
              :key="index" 
              class="color-item"
            >
              <input 
                type="color" 
                v-model="colors[index]" 
                class="color-picker"
              />
              <input 
                type="text" 
                v-model="colors[index]" 
                class="color-input"
              />
            </div>
          </div>
        </div>

        <div class="control-buttons">
          <button class="btn-generate" @click="generateGradient">随机生成</button>
          <button class="btn-copy" @click="copyCss">复制 CSS</button>
        </div>
      </div>
    </GlassContainer>

    <div class="code-section">
      <h3>生成的 CSS 代码</h3>
      <pre class="code-block"><code>{{ cssCode }}</code></pre>
    </div>

    <div class="info-section">
      <h3>技术实现</h3>
      <ul>
        <li>使用 HSL 色彩空间生成和谐的颜色</li>
        <li>支持线性、径向、锥形三种渐变类型</li>
        <li>实时预览渐变效果</li>
        <li>一键复制 CSS 代码</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useClipboard } from '../../composables/useClipboard'

const router = useRouter()
const { copy, copied } = useClipboard()

const gradientType = ref('linear-gradient')
const colorCount = ref(3)
const angle = ref(135)
const colors = ref([])

function generateColors(count) {
  const result = []
  const baseHue = Math.floor(Math.random() * 360)
  
  for (let i = 0; i < count; i++) {
    const hue = (baseHue + i * (360 / count)) % 360
    const saturation = 60 + Math.floor(Math.random() * 20)
    const lightness = 45 + Math.floor(Math.random() * 20)
    result.push(`hsl(${hue}, ${saturation}%, ${lightness}%)`)
  }
  return result
}

function generateGradient() {
  colors.value = generateColors(colorCount.value)
}

const currentGradient = computed(() => {
  if (colors.value.length === 0) return 'linear-gradient(135deg, #7c3aed, #06b6d4)'
  
  if (gradientType.value === 'linear-gradient') {
    return `${gradientType.value}(${angle.value}deg, ${colors.value.join(', ')})`
  }
  if (gradientType.value === 'radial-gradient') {
    return `${gradientType.value}(circle, ${colors.value.join(', ')})`
  }
  return `${gradientType.value}(${colors.value.join(', ')})`
})

const cssCode = computed(() => {
  return `background: ${currentGradient.value};`
})

async function copyCss() {
  await copy(cssCode.value)
}

function goBack() {
  router.push('/experiments')
}

onMounted(() => {
  generateGradient()
})
</script>

<style scoped>
.experiment-page {
  padding: var(--spacing-lg);
  max-width: 1200px;
  margin: 0 auto;
}

.experiment-header {
  text-align: center;
  margin-bottom: var(--spacing-lg);
}

.back-link {
  display: inline-block;
  margin-bottom: var(--spacing-md);
  color: var(--primary-color);
  cursor: pointer;
  transition: color var(--transition-normal);
  font-size: 0.9rem;
}

.back-link:hover {
  color: var(--secondary-color);
}

.page-title {
  font-size: 2rem;
  margin: 0 0 var(--spacing-sm);
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.page-desc {
  color: var(--text-secondary);
  margin: 0;
}

.experiment-container {
  display: flex;
  gap: var(--spacing-lg);
  padding: var(--spacing-lg);
}

.preview-panel {
  flex: 1;
}

.gradient-preview {
  height: 300px;
  border-radius: var(--radius-md);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
  transition: background 0.5s ease;
}

.gradient-info {
  margin-top: var(--spacing-md);
  display: flex;
  gap: 2rem;
}

.info-item {
  display: flex;
  flex-direction: column;
}

.info-label {
  font-size: 0.75rem;
  color: var(--text-tertiary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.info-value {
  font-size: 0.95rem;
  color: #f1f5f9;
  font-weight: 500;
}

.controls {
  width: 320px;
}

.controls-title {
  font-size: 1rem;
  font-weight: 600;
  color: #f1f5f9;
  margin: 0 0 var(--spacing-lg);
}

.control-group {
  margin-bottom: var(--spacing-md);
}

.control-label {
  display: block;
  font-size: 0.85rem;
  color: var(--text-secondary);
  margin-bottom: 0.5rem;
}

.control-select {
  width: 100%;
  padding: 0.75rem;
  border-radius: var(--radius-sm);
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid var(--glass-border);
  color: #f1f5f9;
  font-size: 0.9rem;
  cursor: pointer;
}

.control-group input[type="range"] {
  width: calc(100% - 60px);
  height: 6px;
  border-radius: 3px;
  background: rgba(255, 255, 255, 0.1);
  outline: none;
  -webkit-appearance: none;
}

.control-group input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: var(--primary-color);
  cursor: pointer;
}

.control-value {
  display: inline-block;
  margin-left: 0.5rem;
  font-size: 0.85rem;
  color: var(--secondary-color);
}

.color-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.color-item {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.color-picker {
  width: 40px;
  height: 40px;
  border: none;
  border-radius: var(--radius-sm);
  cursor: pointer;
  background: none;
}

.color-input {
  flex: 1;
  padding: 0.5rem;
  border-radius: var(--radius-sm);
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid var(--glass-border);
  color: #f1f5f9;
  font-family: monospace;
  font-size: 0.85rem;
}

.control-buttons {
  display: flex;
  gap: 0.5rem;
  margin-top: var(--spacing-lg);
}

.btn-generate, .btn-copy {
  flex: 1;
  padding: 0.75rem;
  border-radius: var(--radius-sm);
  font-size: 0.85rem;
  font-weight: 500;
  transition: all var(--transition-normal);
  cursor: pointer;
}

.btn-generate {
  background: var(--gradient-primary);
  color: #fff;
  box-shadow: var(--glow-primary);
}

.btn-generate:hover {
  transform: translateY(-2px);
}

.btn-copy {
  background: rgba(255, 255, 255, 0.1);
  color: #f1f5f9;
}

.btn-copy:hover, .btn-copy.copied {
  background: rgba(16, 185, 129, 0.2);
  color: #22c55e;
}

.code-section {
  margin-top: var(--spacing-lg);
  padding: var(--spacing-lg);
  background: rgba(255, 255, 255, 0.03);
  border-radius: var(--radius-md);
}

.code-section h3 {
  font-size: 1rem;
  font-weight: 600;
  color: #f1f5f9;
  margin: 0 0 var(--spacing-md);
}

.code-block {
  background: rgba(0, 0, 0, 0.3);
  padding: 1rem;
  border-radius: var(--radius-sm);
  overflow-x: auto;
  margin: 0;
}

.code-block code {
  color: #22c55e;
  font-family: monospace;
  font-size: 0.9rem;
}

.info-section {
  margin-top: var(--spacing-lg);
  padding: var(--spacing-lg);
  background: rgba(255, 255, 255, 0.03);
  border-radius: var(--radius-md);
}

.info-section h3 {
  font-size: 1rem;
  font-weight: 600;
  color: #f1f5f9;
  margin: 0 0 var(--spacing-md);
}

.info-section ul {
  margin: 0;
  padding-left: 1.5rem;
}

.info-section li {
  font-size: 0.85rem;
  color: var(--text-secondary);
  margin-bottom: 0.25rem;
}

@media (max-width: 767px) {
  .experiment-container {
    flex-direction: column;
  }
  
  .controls {
    width: 100%;
  }
  
  .gradient-info {
    flex-direction: column;
    gap: 0.5rem;
  }
}
</style>

<template>
  <div class="experiment-page">
    <div class="experiment-header">
      <div class="back-link" @click="goBack">← 返回实验列表</div>
      <h1 class="page-title">🌊 波浪动画</h1>
      <p class="page-desc">使用 SVG 路径动画创建流畅的波浪效果</p>
    </div>

    <GlassContainer class="experiment-container">
      <div class="wave-wrapper">
        <svg viewBox="0 0 800 200" preserveAspectRatio="none">
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" :style="{ stopColor: waveColor1 }" />
              <stop offset="50%" :style="{ stopColor: waveColor2 }" />
              <stop offset="100%" :style="{ stopColor: waveColor3 }" />
            </linearGradient>
            <linearGradient id="waveGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" :style="{ stopColor: waveColor2, stopOpacity: 0.5 }" />
              <stop offset="50%" :style="{ stopColor: waveColor3, stopOpacity: 0.5 }" />
              <stop offset="100%" :style="{ stopColor: waveColor1, stopOpacity: 0.5 }" />
            </linearGradient>
          </defs>
          <path 
            :d="wavePath1" 
            fill="url(#waveGradient)"
            class="wave wave-1"
          />
          <path 
            :d="wavePath2" 
            fill="url(#waveGradient2)"
            class="wave wave-2"
          />
        </svg>
        <div class="wave-reflection"></div>
      </div>

      <div class="controls">
        <h3 class="controls-title">参数调节</h3>
        
        <div class="control-group">
          <label class="control-label">波浪高度</label>
          <input type="range" v-model.number="waveHeight" min="10" max="60" step="5" />
          <span class="control-value">{{ waveHeight }}px</span>
        </div>

        <div class="control-group">
          <label class="control-label">波浪周期</label>
          <input type="range" v-model.number="wavePeriod" min="2" max="8" step="1" />
          <span class="control-value">{{ wavePeriod }}</span>
        </div>

        <div class="control-group">
          <label class="control-label">动画速度</label>
          <input type="range" v-model.number="animationSpeed" min="1" max="10" step="1" />
          <span class="control-value">{{ animationSpeed }}x</span>
        </div>

        <div class="control-group">
          <label class="control-label">颜色主题</label>
          <select v-model="colorTheme" class="control-select">
            <option value="purple">紫色主题</option>
            <option value="cyan">青色主题</option>
            <option value="ocean">海洋主题</option>
            <option value="sunset">日落主题</option>
          </select>
        </div>

        <div class="control-group">
          <label class="control-label">波浪数量</label>
          <input type="range" v-model.number="waveCount" min="1" max="3" step="1" />
          <span class="control-value">{{ waveCount }}</span>
        </div>

        <div class="control-buttons">
          <button class="btn-reset" @click="resetWave">重置</button>
          <button class="btn-toggle" @click="toggleAnimation">{{ isPlaying ? '暂停' : '播放' }}</button>
        </div>
      </div>
    </GlassContainer>

    <div class="info-section">
      <h3>技术实现</h3>
      <ul>
        <li>SVG path 路径动画</li>
        <li>贝塞尔曲线绘制波浪形状</li>
        <li>CSS animation 控制动画</li>
        <li>渐变填充创建色彩效果</li>
        <li>反射效果增强视觉</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const waveHeight = ref(30)
const wavePeriod = ref(4)
const animationSpeed = ref(3)
const colorTheme = ref('purple')
const waveCount = ref(2)
const isPlaying = ref(true)

const themes = {
  purple: ['#7c3aed', '#a78bfa', '#c4b5fd'],
  cyan: ['#06b6d4', '#22d3ee', '#67e8f9'],
  ocean: ['#0ea5e9', '#0284c7', '#0369a1'],
  sunset: ['#f97316', '#ef4444', '#ec4899']
}

const waveColor1 = computed(() => themes[colorTheme.value][0])
const waveColor2 = computed(() => themes[colorTheme.value][1])
const waveColor3 = computed(() => themes[colorTheme.value][2])

let animationId = null
let time = 0

function generateWavePath(offset = 0) {
  const width = 800
  const height = 200
  const amplitude = waveHeight.value
  const frequency = wavePeriod.value
  const segments = 100
  
  let path = `M 0 ${height / 2}`
  
  for (let i = 0; i <= segments; i++) {
    const x = (i / segments) * width
    const y = height / 2 + Math.sin((x / width) * Math.PI * 2 * frequency + time + offset) * amplitude
    
    if (i === 0) {
      path += ` L ${x} ${y}`
    } else {
      const prevX = ((i - 1) / segments) * width
      const prevY = height / 2 + Math.sin(((i - 1) / segments) * Math.PI * 2 * frequency + time + offset) * amplitude
      const cpX = (prevX + x) / 2
      path += ` C ${cpX} ${prevY}, ${cpX} ${y}, ${x} ${y}`
    }
  }
  
  path += ` L ${width} ${height} L 0 ${height} Z`
  
  return path
}

const wavePath1 = computed(() => generateWavePath(0))
const wavePath2 = computed(() => generateWavePath(Math.PI))

function animate() {
  if (!isPlaying.value) return
  
  time += 0.02 * animationSpeed.value
  
  animationId = requestAnimationFrame(animate)
}

function resetWave() {
  waveHeight.value = 30
  wavePeriod.value = 4
  animationSpeed.value = 3
  colorTheme.value = 'purple'
  waveCount.value = 2
  time = 0
}

function toggleAnimation() {
  isPlaying.value = !isPlaying.value
  if (isPlaying.value) {
    animate()
  }
}

function goBack() {
  router.push('/experiments')
}

onMounted(() => {
  animate()
})

onUnmounted(() => {
  if (animationId) {
    cancelAnimationFrame(animationId)
  }
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
  padding: 0;
  overflow: hidden;
}

.wave-wrapper {
  flex: 1;
  height: 250px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: var(--radius-md);
  overflow: hidden;
  position: relative;
}

.wave-wrapper svg {
  width: 100%;
  height: 100%;
}

.wave {
  transition: fill 0.5s ease;
}

.wave-reflection {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50%;
  background: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.3));
  pointer-events: none;
}

.controls {
  width: 280px;
  padding: var(--spacing-lg);
  border-left: 1px solid var(--glass-border);
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

.control-buttons {
  display: flex;
  gap: 0.5rem;
  margin-top: var(--spacing-lg);
}

.btn-reset, .btn-toggle {
  flex: 1;
  padding: 0.75rem;
  border-radius: var(--radius-sm);
  font-size: 0.85rem;
  font-weight: 500;
  transition: all var(--transition-normal);
  cursor: pointer;
}

.btn-reset {
  background: rgba(255, 255, 255, 0.1);
  color: #f1f5f9;
}

.btn-reset:hover {
  background: rgba(255, 255, 255, 0.15);
}

.btn-toggle {
  background: var(--gradient-primary);
  color: #fff;
  box-shadow: var(--glow-primary);
}

.btn-toggle:hover {
  transform: translateY(-2px);
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
  
  .wave-wrapper {
    height: 200px;
  }
  
  .controls {
    width: 100%;
    border-left: none;
    border-top: 1px solid var(--glass-border);
  }
}
</style>

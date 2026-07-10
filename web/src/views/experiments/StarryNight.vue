<template>
  <div class="experiment-page">
    <div class="experiment-header">
      <div class="back-link" @click="goBack">← 返回实验列表</div>
      <h1 class="page-title">💫 星空背景</h1>
      <p class="page-desc">创建动态的星空背景，包含闪烁和移动的星星</p>
    </div>

    <GlassContainer class="experiment-container">
      <div class="canvas-wrapper">
        <canvas ref="canvasRef"></canvas>
      </div>

      <div class="controls">
        <h3 class="controls-title">参数调节</h3>
        
        <div class="control-group">
          <label class="control-label">星星数量</label>
          <input type="range" v-model.number="starCount" min="50" max="500" step="50" />
          <span class="control-value">{{ starCount }}</span>
        </div>

        <div class="control-group">
          <label class="control-label">星星大小</label>
          <input type="range" v-model.number="starSize" min="1" max="5" step="0.5" />
          <span class="control-value">{{ starSize }}px</span>
        </div>

        <div class="control-group">
          <label class="control-label">移动速度</label>
          <input type="range" v-model.number="moveSpeed" min="0" max="5" step="0.5" />
          <span class="control-value">{{ moveSpeed }}x</span>
        </div>

        <div class="control-group">
          <label class="control-label">闪烁频率</label>
          <input type="range" v-model.number="twinkleSpeed" min="0" max="10" step="1" />
          <span class="control-value">{{ twinkleSpeed }}x</span>
        </div>

        <div class="control-group">
          <label class="control-label">流星频率</label>
          <input type="range" v-model.number="shootingStarFreq" min="0" max="10" step="1" />
          <span class="control-value">{{ shootingStarFreq }}%</span>
        </div>

        <div class="control-group">
          <label class="control-label">背景渐变</label>
          <select v-model="backgroundTheme" class="control-select">
            <option value="deep-space">深空主题</option>
            <option value="night-sky">夜空主题</option>
            <option value="aurora">极光主题</option>
            <option value="purple-haze">紫雾主题</option>
          </select>
        </div>

        <div class="control-buttons">
          <button class="btn-reset" @click="resetStars">重置</button>
          <button class="btn-toggle" @click="toggleAnimation">{{ isPlaying ? '暂停' : '播放' }}</button>
        </div>
      </div>
    </GlassContainer>

    <div class="info-section">
      <h3>技术实现</h3>
      <ul>
        <li>Canvas 2D API 绘制星星</li>
        <li>随机分布算法生成星星位置</li>
        <li>闪烁效果使用透明度变化</li>
        <li>流星效果使用粒子系统</li>
        <li>渐变背景增强视觉深度</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const canvasRef = ref(null)
const starCount = ref(200)
const starSize = ref(2)
const moveSpeed = ref(1)
const twinkleSpeed = ref(3)
const shootingStarFreq = ref(5)
const backgroundTheme = ref('deep-space')
const isPlaying = ref(true)

let ctx = null
let stars = []
let shootingStars = []
let animationId = null

const backgrounds = {
  'deep-space': ['#0a0a1a', '#0f0f2a', '#1a1a3a'],
  'night-sky': ['#1a1a2e', '#16213e', '#0f3460'],
  'aurora': ['#0f0c29', '#302b63', '#24243e'],
  'purple-haze': ['#1a0a2e', '#2d1b4e', '#1a0a2e']
}

class Star {
  constructor(x, y, size) {
    this.x = x
    this.y = y
    this.size = size
    this.baseOpacity = Math.random() * 0.5 + 0.3
    this.opacity = this.baseOpacity
    this.twinklePhase = Math.random() * Math.PI * 2
    this.twinkleSpeed = Math.random() * 0.05 + 0.02
    this.vx = (Math.random() - 0.5) * 0.1
    this.vy = (Math.random() - 0.5) * 0.1
    this.color = `rgba(255, 255, 255, ${this.opacity})`
  }

  update(width, height, speed, twinkle) {
    this.x += this.vx * speed
    this.y += this.vy * speed

    if (this.x < 0) this.x = width
    if (this.x > width) this.x = 0
    if (this.y < 0) this.y = height
    if (this.y > height) this.y = 0

    this.twinklePhase += this.twinkleSpeed * twinkle
    this.opacity = this.baseOpacity + Math.sin(this.twinklePhase) * 0.3
    
    if (this.opacity < 0.1) this.opacity = 0.1
    if (this.opacity > 1) this.opacity = 1

    this.color = `rgba(255, 255, 255, ${this.opacity})`
  }

  draw(context) {
    context.beginPath()
    context.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    context.fillStyle = this.color
    context.fill()
    context.closePath()
  }
}

class ShootingStar {
  constructor(width, height) {
    this.reset(width, height)
  }

  reset(width, height) {
    this.x = Math.random() * width
    this.y = Math.random() * height * 0.5
    this.length = Math.random() * 100 + 50
    this.speed = Math.random() * 15 + 10
    this.angle = Math.PI / 4 + (Math.random() - 0.5) * 0.2
    this.opacity = 1
    this.active = true
  }

  update(width, height, speed) {
    this.x += Math.cos(this.angle) * this.speed * speed
    this.y += Math.sin(this.angle) * this.speed * speed
    this.opacity -= 0.02

    if (this.x > width || this.y > height || this.opacity <= 0) {
      this.active = false
    }
  }

  draw(context) {
    const gradient = context.createLinearGradient(
      this.x, this.y,
      this.x - Math.cos(this.angle) * this.length,
      this.y - Math.sin(this.angle) * this.length
    )
    gradient.addColorStop(0, `rgba(255, 255, 255, ${this.opacity})`)
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')

    context.beginPath()
    context.moveTo(this.x, this.y)
    context.lineTo(
      this.x - Math.cos(this.angle) * this.length,
      this.y - Math.sin(this.angle) * this.length
    )
    context.strokeStyle = gradient
    context.lineWidth = 2
    context.stroke()
    context.closePath()
  }
}

function initStars() {
  stars = []
  const canvas = canvasRef.value
  if (!canvas) return
  
  const width = canvas.width
  const height = canvas.height
  
  for (let i = 0; i < starCount.value; i++) {
    const x = Math.random() * width
    const y = Math.random() * height
    stars.push(new Star(x, y, starSize.value * (Math.random() * 0.5 + 0.5)))
  }
}

function drawBackground() {
  const canvas = canvasRef.value
  if (!canvas) return
  
  const width = canvas.width
  const height = canvas.height
  const colors = backgrounds[backgroundTheme.value]
  
  const gradient = ctx.createLinearGradient(0, 0, 0, height)
  gradient.addColorStop(0, colors[0])
  gradient.addColorStop(0.5, colors[1])
  gradient.addColorStop(1, colors[2])
  
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, width, height)
}

function animate() {
  if (!isPlaying.value || !ctx || !canvasRef.value) return
  
  const width = canvasRef.value.width
  const height = canvasRef.value.height
  
  drawBackground()
  
  stars.forEach(star => {
    star.update(width, height, moveSpeed.value, twinkleSpeed.value)
    star.draw(ctx)
  })
  
  shootingStars.forEach((star, index) => {
    if (star.active) {
      star.update(width, height, moveSpeed.value)
      star.draw(ctx)
    } else {
      shootingStars.splice(index, 1)
    }
  })
  
  if (shootingStarFreq.value > 0 && Math.random() < shootingStarFreq.value / 1000) {
    shootingStars.push(new ShootingStar(width, height))
  }
  
  animationId = requestAnimationFrame(animate)
}

function resizeCanvas() {
  const canvas = canvasRef.value
  if (!canvas) return
  
  const container = canvas.parentElement
  canvas.width = container.clientWidth
  canvas.height = container.clientHeight
  
  initStars()
}

function resetStars() {
  starCount.value = 200
  starSize.value = 2
  moveSpeed.value = 1
  twinkleSpeed.value = 3
  shootingStarFreq.value = 5
  backgroundTheme.value = 'deep-space'
  initStars()
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

watch([starCount, starSize], () => {
  initStars()
})

onMounted(() => {
  const canvas = canvasRef.value
  if (canvas) {
    ctx = canvas.getContext('2d')
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    animate()
  }
})

onUnmounted(() => {
  if (animationId) {
    cancelAnimationFrame(animationId)
  }
  window.removeEventListener('resize', resizeCanvas)
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

.canvas-wrapper {
  flex: 1;
  height: 400px;
  border-radius: var(--radius-md);
  overflow: hidden;
}

.canvas-wrapper canvas {
  display: block;
  width: 100%;
  height: 100%;
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
  
  .canvas-wrapper {
    height: 300px;
  }
  
  .controls {
    width: 100%;
    border-left: none;
    border-top: 1px solid var(--glass-border);
  }
}
</style>

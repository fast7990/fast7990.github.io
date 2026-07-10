<template>
  <div class="experiment-page">
    <div class="experiment-header">
      <div class="back-link" @click="goBack">← 返回实验列表</div>
      <h1 class="page-title">🎨 粒子碰撞效果</h1>
      <p class="page-desc">探索粒子系统的物理碰撞效果，观察粒子之间的交互</p>
    </div>

    <GlassContainer class="experiment-container">
      <div class="canvas-wrapper">
        <canvas ref="canvasRef"></canvas>
      </div>

      <div class="controls">
        <h3 class="controls-title">参数调节</h3>
        <div class="control-group">
          <label class="control-label">粒子数量</label>
          <input type="range" v-model.number="particleCount" min="10" max="100" step="10" />
          <span class="control-value">{{ particleCount }}</span>
        </div>
        <div class="control-group">
          <label class="control-label">粒子大小</label>
          <input type="range" v-model.number="particleSize" min="2" max="20" step="1" />
          <span class="control-value">{{ particleSize }}px</span>
        </div>
        <div class="control-group">
          <label class="control-label">运动速度</label>
          <input type="range" v-model.number="speed" min="0.5" max="5" step="0.5" />
          <span class="control-value">{{ speed }}x</span>
        </div>
        <div class="control-group">
          <label class="control-label">碰撞弹性</label>
          <input type="range" v-model.number="bounce" min="0" max="1" step="0.1" />
          <span class="control-value">{{ bounce }}</span>
        </div>
        <div class="control-buttons">
          <button class="btn-reset" @click="resetParticles">重置粒子</button>
          <button class="btn-toggle" @click="toggleAnimation">{{ isPlaying ? '暂停' : '播放' }}</button>
        </div>
      </div>
    </GlassContainer>

    <div class="info-section">
      <h3>技术实现</h3>
      <ul>
        <li>使用 Canvas 2D API 绘制粒子</li>
        <li>实现粒子之间的碰撞检测（圆形碰撞）</li>
        <li>基于动量守恒的碰撞响应</li>
        <li>边界反弹处理</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const canvasRef = ref(null)
const particleCount = ref(50)
const particleSize = ref(8)
const speed = ref(2)
const bounce = ref(0.8)
const isPlaying = ref(true)

let ctx = null
let particles = []
let animationId = null

class Particle {
  constructor(x, y, size) {
    this.x = x
    this.y = y
    this.size = size
    this.vx = (Math.random() - 0.5) * 4
    this.vy = (Math.random() - 0.5) * 4
    this.color = `hsl(${Math.random() * 360}, 70%, 60%)`
    this.mass = size * size
  }

  update(width, height, speedFactor, bounceFactor) {
    this.vx *= speedFactor
    this.vy *= speedFactor
    
    this.x += this.vx
    this.y += this.vy

    if (this.x - this.size < 0) {
      this.x = this.size
      this.vx *= -bounceFactor
    }
    if (this.x + this.size > width) {
      this.x = width - this.size
      this.vx *= -bounceFactor
    }
    if (this.y - this.size < 0) {
      this.y = this.size
      this.vy *= -bounceFactor
    }
    if (this.y + this.size > height) {
      this.y = height - this.size
      this.vy *= -bounceFactor
    }
  }

  draw(context) {
    context.beginPath()
    context.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    context.fillStyle = this.color
    context.fill()
    context.closePath()
  }
}

function initParticles() {
  particles = []
  const canvas = canvasRef.value
  if (!canvas) return
  
  const width = canvas.width
  const height = canvas.height
  
  for (let i = 0; i < particleCount.value; i++) {
    const x = Math.random() * (width - particleSize.value * 2) + particleSize.value
    const y = Math.random() * (height - particleSize.value * 2) + particleSize.value
    particles.push(new Particle(x, y, particleSize.value))
  }
}

function checkCollision(p1, p2) {
  const dx = p2.x - p1.x
  const dy = p2.y - p1.y
  const distance = Math.sqrt(dx * dx + dy * dy)
  const minDistance = p1.size + p2.size
  
  if (distance < minDistance) {
    const angle = Math.atan2(dy, dx)
    const overlap = minDistance - distance
    
    const totalMass = p1.mass + p2.mass
    const ratio1 = p2.mass / totalMass
    const ratio2 = p1.mass / totalMass
    
    p1.x -= Math.cos(angle) * overlap * ratio1
    p1.y -= Math.sin(angle) * overlap * ratio1
    p2.x += Math.cos(angle) * overlap * ratio2
    p2.y += Math.sin(angle) * overlap * ratio2
    
    const vx1 = p1.vx
    const vy1 = p1.vy
    const vx2 = p2.vx
    const vy2 = p2.vy
    
    const dvx = vx1 - vx2
    const dvy = vy1 - vy2
    const dvn = dvx * Math.cos(angle) + dvy * Math.sin(angle)
    
    if (dvn > 0) {
      const restitution = bounce.value
      const j = -(1 + restitution) * dvn / totalMass * 2
      
      p1.vx += j * p2.mass * Math.cos(angle)
      p1.vy += j * p2.mass * Math.sin(angle)
      p2.vx -= j * p1.mass * Math.cos(angle)
      p2.vy -= j * p1.mass * Math.sin(angle)
    }
  }
}

function animate() {
  if (!ctx || !canvasRef.value) return
  
  const width = canvasRef.value.width
  const height = canvasRef.value.height
  
  ctx.fillStyle = 'rgba(10, 10, 26, 0.3)'
  ctx.fillRect(0, 0, width, height)
  
  particles.forEach(p => {
    p.update(width, height, speed.value, bounce.value)
    p.draw(ctx)
  })
  
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      checkCollision(particles[i], particles[j])
    }
  }
  
  if (isPlaying.value) {
    animationId = requestAnimationFrame(animate)
  }
}

function resizeCanvas() {
  const canvas = canvasRef.value
  if (!canvas) return
  
  const container = canvas.parentElement
  canvas.width = container.clientWidth
  canvas.height = container.clientHeight
  
  initParticles()
}

function goBack() {
  router.push('/experiments')
}

function resetParticles() {
  initParticles()
}

function toggleAnimation() {
  isPlaying.value = !isPlaying.value
  if (isPlaying.value) {
    animate()
  }
}

watch([particleCount, particleSize], () => {
  initParticles()
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
  height: 500px;
  background: rgba(0, 0, 0, 0.3);
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

.control-group input[type="range"] {
  width: 100%;
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
  box-shadow: 0 0 10px rgba(124, 58, 237, 0.5);
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
    height: 350px;
  }
  
  .controls {
    width: 100%;
    border-left: none;
    border-top: 1px solid var(--glass-border);
  }
}
</style>

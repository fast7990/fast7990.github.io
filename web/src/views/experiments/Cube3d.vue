<template>
  <div class="experiment-page">
    <div class="experiment-header">
      <div class="back-link" @click="goBack">← 返回实验列表</div>
      <h1 class="page-title">🔮 3D 旋转立方体</h1>
      <p class="page-desc">使用 CSS 3D 变换创建旋转的立方体效果</p>
    </div>

    <GlassContainer class="experiment-container">
      <div class="scene">
        <div 
          class="cube" 
          :style="cubeStyle"
          @mousedown="startDrag"
          @mousemove="onDrag"
          @mouseup="endDrag"
          @mouseleave="endDrag"
        >
          <div class="cube-face front">前</div>
          <div class="cube-face back">后</div>
          <div class="cube-face right">右</div>
          <div class="cube-face left">左</div>
          <div class="cube-face top">上</div>
          <div class="cube-face bottom">下</div>
        </div>
      </div>

      <div class="controls">
        <h3 class="controls-title">参数调节</h3>
        
        <div class="control-group">
          <label class="control-label">旋转速度</label>
          <input type="range" v-model.number="rotationSpeed" min="0" max="10" step="1" />
          <span class="control-value">{{ rotationSpeed }}x</span>
        </div>

        <div class="control-group">
          <label class="control-label">X 轴旋转</label>
          <input type="range" v-model.number="rotateX" min="0" max="360" step="5" />
          <span class="control-value">{{ rotateX }}°</span>
        </div>

        <div class="control-group">
          <label class="control-label">Y 轴旋转</label>
          <input type="range" v-model.number="rotateY" min="0" max="360" step="5" />
          <span class="control-value">{{ rotateY }}°</span>
        </div>

        <div class="control-group">
          <label class="control-label">立方体大小</label>
          <input type="range" v-model.number="cubeSize" min="100" max="200" step="10" />
          <span class="control-value">{{ cubeSize }}px</span>
        </div>

        <div class="control-group">
          <label class="control-label">透视距离</label>
          <input type="range" v-model.number="perspective" min="300" max="800" step="50" />
          <span class="control-value">{{ perspective }}px</span>
        </div>

        <div class="control-group">
          <label class="control-label">动画模式</label>
          <select v-model="animationMode" class="control-select">
            <option value="auto">自动旋转</option>
            <option value="manual">手动拖拽</option>
            <option value="pulse">脉冲动画</option>
          </select>
        </div>

        <div class="control-buttons">
          <button class="btn-reset" @click="resetRotation">重置</button>
          <button class="btn-toggle" @click="toggleAnimation">{{ isAnimating ? '暂停' : '播放' }}</button>
        </div>
      </div>
    </GlassContainer>

    <div class="info-section">
      <h3>技术实现</h3>
      <ul>
        <li>CSS transform-style: preserve-3d</li>
        <li>CSS perspective 和 perspective-origin</li>
        <li>rotateX / rotateY / rotateZ 3D 变换</li>
        <li>backface-visibility 控制背面可见性</li>
        <li>鼠标拖拽交互</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const rotationSpeed = ref(2)
const rotateX = ref(-20)
const rotateY = ref(30)
const cubeSize = ref(150)
const perspective = ref(500)
const animationMode = ref('auto')
const isAnimating = ref(true)

let animationId = null
let isDragging = false
let lastMouseX = 0
let lastMouseY = 0

const cubeStyle = computed(() => ({
  width: `${cubeSize.value}px`,
  height: `${cubeSize.value}px`,
  transform: `rotateX(${rotateX.value}deg) rotateY(${rotateY.value}deg)`,
  animation: isAnimating.value && animationMode.value === 'auto' 
    ? `spin ${10 / rotationSpeed.value}s linear infinite` 
    : isAnimating.value && animationMode.value === 'pulse'
    ? `pulse 2s ease-in-out infinite`
    : 'none'
}))

const sceneStyle = computed(() => ({
  perspective: `${perspective.value}px`
}))

function animate() {
  if (!isAnimating.value || animationMode.value !== 'auto') return
  
  rotateY.value += rotationSpeed.value * 2
  rotateX.value += rotationSpeed.value * 0.5
  
  animationId = requestAnimationFrame(animate)
}

function startDrag(e) {
  if (animationMode.value !== 'manual') return
  isDragging = true
  lastMouseX = e.clientX
  lastMouseY = e.clientY
}

function onDrag(e) {
  if (!isDragging) return
  
  const deltaX = e.clientX - lastMouseX
  const deltaY = e.clientY - lastMouseY
  
  rotateY.value += deltaX * 0.5
  rotateX.value -= deltaY * 0.5
  
  lastMouseX = e.clientX
  lastMouseY = e.clientY
}

function endDrag() {
  isDragging = false
}

function resetRotation() {
  rotateX.value = -20
  rotateY.value = 30
}

function toggleAnimation() {
  isAnimating.value = !isAnimating.value
  if (isAnimating.value && animationMode.value === 'auto') {
    animate()
  }
}

function goBack() {
  router.push('/experiments')
}

watch(animationMode, (newMode) => {
  if (newMode === 'auto' && isAnimating.value) {
    animate()
  }
})

onMounted(() => {
  if (animationMode.value === 'auto') {
    animate()
  }
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
  padding: var(--spacing-xl);
  justify-content: center;
  align-items: center;
}

.scene {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 400px;
}

.cube {
  position: relative;
  transform-style: preserve-3d;
  cursor: grab;
}

.cube:active {
  cursor: grabbing;
}

.cube-face {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  font-weight: 700;
  color: #fff;
  border: 2px solid rgba(255, 255, 255, 0.2);
  backface-visibility: visible;
  opacity: 0.9;
}

.front {
  background: linear-gradient(135deg, rgba(124, 58, 237, 0.8), rgba(124, 58, 237, 0.4));
  transform: translateZ(75px);
}

.back {
  background: linear-gradient(135deg, rgba(6, 182, 212, 0.8), rgba(6, 182, 212, 0.4));
  transform: rotateY(180deg) translateZ(75px);
}

.right {
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.8), rgba(16, 185, 129, 0.4));
  transform: rotateY(90deg) translateZ(75px);
}

.left {
  background: linear-gradient(135deg, rgba(245, 158, 11, 0.8), rgba(245, 158, 11, 0.4));
  transform: rotateY(-90deg) translateZ(75px);
}

.top {
  background: linear-gradient(135deg, rgba(239, 68, 68, 0.8), rgba(239, 68, 68, 0.4));
  transform: rotateX(90deg) translateZ(75px);
}

.bottom {
  background: linear-gradient(135deg, rgba(236, 72, 153, 0.8), rgba(236, 72, 153, 0.4));
  transform: rotateX(-90deg) translateZ(75px);
}

.controls {
  width: 280px;
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

@keyframes spin {
  from {
    transform: rotateX(-20deg) rotateY(0deg);
  }
  to {
    transform: rotateX(-20deg) rotateY(360deg);
  }
}

@keyframes pulse {
  0%, 100% {
    transform: rotateX(-20deg) rotateY(30deg) scale(1);
  }
  50% {
    transform: rotateX(-20deg) rotateY(30deg) scale(1.1);
  }
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
  
  .scene {
    height: 300px;
  }
  
  .controls {
    width: 100%;
  }
}
</style>

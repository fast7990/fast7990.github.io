<template>
  <div class="experiment-page">
    <div class="experiment-header">
      <div class="back-link" @click="goBack">← 返回实验列表</div>
      <h1 class="page-title">🎵 音频可视化</h1>
      <p class="page-desc">将音频波形可视化，创建炫酷的音乐频谱效果</p>
    </div>

    <GlassContainer class="experiment-container">
      <div class="canvas-wrapper">
        <canvas ref="canvasRef"></canvas>
      </div>

      <div class="controls">
        <h3 class="controls-title">控制</h3>
        
        <div class="control-group">
          <label class="control-label">可视化模式</label>
          <select v-model="visualizationMode" class="control-select">
            <option value="bars">条形频谱</option>
            <option value="wave">波形图</option>
            <option value="circle">环形频谱</option>
          </select>
        </div>

        <div class="control-group">
          <label class="control-label">条形数量</label>
          <input type="range" v-model.number="barCount" min="32" max="256" step="32" />
          <span class="control-value">{{ barCount }}</span>
        </div>

        <div class="control-group">
          <label class="control-label">灵敏度</label>
          <input type="range" v-model.number="sensitivity" min="1" max="5" step="0.5" />
          <span class="control-value">{{ sensitivity }}x</span>
        </div>

        <div class="control-group">
          <label class="control-label">颜色主题</label>
          <select v-model="colorTheme" class="control-select">
            <option value="purple">紫色主题</option>
            <option value="cyan">青色主题</option>
            <option value="rainbow">彩虹主题</option>
            <option value="fire">火焰主题</option>
          </select>
        </div>

        <div class="audio-controls">
          <button 
            class="btn-mic" 
            :class="{ active: isListening }"
            @click="toggleMicrophone"
          >
            {{ isListening ? '🔇 停止监听' : '🎤 麦克风监听' }}
          </button>
          <input 
            type="file" 
            accept="audio/*" 
            class="audio-input"
            @change="handleAudioFile"
          />
          <label class="btn-upload" for="audio-file">📁 上传音频</label>
        </div>

        <div v-if="audioFile" class="file-info">
          <span class="file-name">{{ audioFile.name }}</span>
          <button class="btn-clear" @click="clearAudio">清除</button>
        </div>
      </div>
    </GlassContainer>

    <div class="info-section">
      <h3>技术实现</h3>
      <ul>
        <li>使用 Web Audio API 处理音频</li>
        <li>AnalyserNode 提取音频频率数据</li>
        <li>Canvas 2D 绘制可视化效果</li>
        <li>支持麦克风输入和本地音频文件</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const canvasRef = ref(null)
const visualizationMode = ref('bars')
const barCount = ref(64)
const sensitivity = ref(2)
const colorTheme = ref('purple')
const isListening = ref(false)
const audioFile = ref(null)

let ctx = null
let audioContext = null
let analyser = null
let source = null
let animationId = null

const themes = {
  purple: ['#7c3aed', '#a78bfa', '#c4b5fd'],
  cyan: ['#06b6d4', '#22d3ee', '#67e8f9'],
  rainbow: ['#ef4444', '#f97316', '#eab308', '#22c55e', '#06b6d4', '#7c3aed'],
  fire: ['#ef4444', '#f97316', '#fbbf24', '#fde047']
}

function getThemeColors() {
  return themes[colorTheme.value] || themes.purple
}

function initAudio() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)()
  }
  analyser = audioContext.createAnalyser()
  analyser.fftSize = barCount.value * 2
}

async function startMicrophone() {
  try {
    initAudio()
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    source = audioContext.createMediaStreamSource(stream)
    source.connect(analyser)
    isListening.value = true
    animate()
  } catch (err) {
    alert('无法访问麦克风，请检查权限设置')
  }
}

function stopMicrophone() {
  if (source) {
    source.disconnect()
    source = null
  }
  isListening.value = false
}

function toggleMicrophone() {
  if (isListening.value) {
    stopMicrophone()
  } else {
    startMicrophone()
  }
}

function handleAudioFile(event) {
  const file = event.target.files[0]
  if (!file) return
  
  audioFile.value = file
  const url = URL.createObjectURL(file)
  
  initAudio()
  
  const audio = new Audio(url)
  audio.crossOrigin = 'anonymous'
  
  audio.onloadedmetadata = () => {
    source = audioContext.createMediaElementSource(audio)
    source.connect(analyser)
    analyser.connect(audioContext.destination)
    audio.play()
    isListening.value = true
    animate()
  }
  
  audio.onerror = () => {
    alert('无法播放音频文件')
    URL.revokeObjectURL(url)
  }
}

function clearAudio() {
  stopMicrophone()
  audioFile.value = null
  if (canvasRef.value && ctx) {
    ctx.fillStyle = 'rgba(10, 10, 26, 1)'
    ctx.fillRect(0, 0, canvasRef.value.width, canvasRef.value.height)
  }
}

function drawBars(dataArray) {
  const canvas = canvasRef.value
  if (!canvas) return
  
  const width = canvas.width
  const height = canvas.height
  const barWidth = width / barCount.value
  const colors = getThemeColors()
  
  ctx.clearRect(0, 0, width, height)
  
  for (let i = 0; i < barCount.value; i++) {
    const barHeight = (dataArray[i] / 255) * height * sensitivity.value * 0.8
    const colorIndex = Math.floor((i / barCount.value) * colors.length)
    const gradient = ctx.createLinearGradient(0, height - barHeight, 0, height)
    gradient.addColorStop(0, colors[colorIndex])
    gradient.addColorStop(1, colors[colorIndex] + '40')
    
    ctx.fillStyle = gradient
    ctx.fillRect(i * barWidth, height - barHeight, barWidth - 2, barHeight)
  }
}

function drawWave(dataArray) {
  const canvas = canvasRef.value
  if (!canvas) return
  
  const width = canvas.width
  const height = canvas.height
  const colors = getThemeColors()
  
  ctx.clearRect(0, 0, width, height)
  
  ctx.beginPath()
  ctx.moveTo(0, height / 2)
  
  for (let i = 0; i < barCount.value; i++) {
    const x = (i / barCount.value) * width
    const y = height / 2 + ((dataArray[i] - 128) / 128) * height * 0.4 * sensitivity.value
    ctx.lineTo(x, y)
  }
  
  const gradient = ctx.createLinearGradient(0, 0, width, 0)
  colors.forEach((color, i) => {
    gradient.addColorStop(i / (colors.length - 1), color)
  })
  
  ctx.strokeStyle = gradient
  ctx.lineWidth = 2
  ctx.stroke()
}

function drawCircle(dataArray) {
  const canvas = canvasRef.value
  if (!canvas) return
  
  const width = canvas.width
  const height = canvas.height
  const centerX = width / 2
  const centerY = height / 2
  const baseRadius = Math.min(width, height) * 0.2
  const colors = getThemeColors()
  
  ctx.clearRect(0, 0, width, height)
  
  for (let i = 0; i < barCount.value; i++) {
    const angle = (i / barCount.value) * Math.PI * 2 - Math.PI / 2
    const barHeight = (dataArray[i] / 255) * height * 0.3 * sensitivity.value
    const innerRadius = baseRadius
    const outerRadius = baseRadius + barHeight
    
    const x1 = centerX + Math.cos(angle) * innerRadius
    const y1 = centerY + Math.sin(angle) * innerRadius
    const x2 = centerX + Math.cos(angle) * outerRadius
    const y2 = centerY + Math.sin(angle) * outerRadius
    
    const colorIndex = Math.floor((i / barCount.value) * colors.length)
    
    ctx.beginPath()
    ctx.moveTo(x1, y1)
    ctx.lineTo(x2, y2)
    ctx.strokeStyle = colors[colorIndex]
    ctx.lineWidth = 3
    ctx.stroke()
  }
  
  ctx.beginPath()
  ctx.arc(centerX, centerY, baseRadius, 0, Math.PI * 2)
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)'
  ctx.lineWidth = 2
  ctx.stroke()
}

function animate() {
  if (!isListening.value || !analyser) return
  
  const bufferLength = analyser.frequencyBinCount
  const dataArray = new Uint8Array(bufferLength)
  
  analyser.getByteFrequencyData(dataArray)
  
  switch (visualizationMode.value) {
    case 'bars':
      drawBars(dataArray)
      break
    case 'wave':
      drawWave(dataArray)
      break
    case 'circle':
      drawCircle(dataArray)
      break
  }
  
  animationId = requestAnimationFrame(animate)
}

function resizeCanvas() {
  const canvas = canvasRef.value
  if (!canvas) return
  
  const container = canvas.parentElement
  canvas.width = container.clientWidth
  canvas.height = container.clientHeight
  
  if (ctx) {
    ctx.fillStyle = 'rgba(10, 10, 26, 1)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }
}

function goBack() {
  router.push('/experiments')
}

watch(barCount, () => {
  if (analyser) {
    analyser.fftSize = barCount.value * 2
  }
})

onMounted(() => {
  const canvas = canvasRef.value
  if (canvas) {
    ctx = canvas.getContext('2d')
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    
    ctx.fillStyle = 'rgba(10, 10, 26, 1)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }
})

onUnmounted(() => {
  if (animationId) {
    cancelAnimationFrame(animationId)
  }
  stopMicrophone()
  if (audioContext) {
    audioContext.close()
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

.audio-controls {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: var(--spacing-lg);
}

.btn-mic {
  width: 100%;
  padding: 0.875rem;
  border-radius: var(--radius-sm);
  font-size: 0.9rem;
  font-weight: 500;
  background: rgba(255, 255, 255, 0.1);
  color: #f1f5f9;
  transition: all var(--transition-normal);
  cursor: pointer;
}

.btn-mic:hover {
  background: rgba(255, 255, 255, 0.15);
}

.btn-mic.active {
  background: rgba(239, 68, 68, 0.2);
  color: #ef4444;
}

.audio-input {
  display: none;
}

.btn-upload {
  display: inline-block;
  width: 100%;
  padding: 0.875rem;
  border-radius: var(--radius-sm);
  font-size: 0.9rem;
  font-weight: 500;
  background: var(--gradient-primary);
  color: #fff;
  text-align: center;
  cursor: pointer;
  box-shadow: var(--glow-primary);
  transition: all var(--transition-normal);
}

.btn-upload:hover {
  transform: translateY(-2px);
}

.file-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem;
  margin-top: var(--spacing-md);
  background: rgba(255, 255, 255, 0.05);
  border-radius: var(--radius-sm);
}

.file-name {
  font-size: 0.8rem;
  color: var(--text-secondary);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  flex: 1;
}

.btn-clear {
  padding: 0.25rem 0.75rem;
  font-size: 0.75rem;
  color: #ef4444;
  background: rgba(239, 68, 68, 0.1);
  border-radius: 4px;
  cursor: pointer;
  transition: background var(--transition-normal);
}

.btn-clear:hover {
  background: rgba(239, 68, 68, 0.2);
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

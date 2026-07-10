<template>
  <div class="experiments">
    <h1 class="page-title">趣味小实验</h1>
    <p class="page-subtitle">探索有趣的前端技术实验</p>

    <div class="experiments-grid">
      <GlassContainer 
        v-for="(exp, index) in experiments" 
        :key="exp.path" 
        class="experiment-card"
        :style="{ animationDelay: `${index * 100}ms` }"
        @click="navigateTo(exp.path)"
      >
        <div class="card-icon">{{ exp.icon }}</div>
        <div class="card-content">
          <h3 class="card-title">{{ exp.title }}</h3>
          <p class="card-desc">{{ exp.desc }}</p>
          <div class="card-tags">
            <span v-for="tag in exp.tags" :key="tag" class="tag">{{ tag }}</span>
          </div>
        </div>
        <div class="card-arrow">→</div>
      </GlassContainer>

      <GlassContainer class="experiment-card empty-card" v-if="experiments.length === 0">
        <div class="empty-icon">🔬</div>
        <p class="empty-text">暂无实验内容</p>
        <p class="empty-hint">即将添加更多有趣的实验...</p>
      </GlassContainer>
    </div>

    <div class="section-info">
      <svg class="info-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10"/>
        <line x1="12" y1="16" x2="12" y2="12"/>
        <line x1="12" y1="8" x2="12.01" y2="8"/>
      </svg>
      <p class="info-text">这里收录了各种有趣的前端技术实验，包括动画效果、交互体验、可视化等。</p>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import GlassContainer from '../components/GlassContainer.vue'

const router = useRouter()

const experiments = [
  {
    icon: '🎨',
    title: '粒子碰撞效果',
    desc: '探索粒子系统的物理碰撞效果，观察粒子之间的交互',
    path: '/experiments/particle-collision',
    tags: ['Canvas', '粒子']
  },
  {
    icon: '🌈',
    title: '渐变色彩生成器',
    desc: '随机生成美丽的渐变色彩方案，可导出 CSS 代码',
    path: '/experiments/gradient-generator',
    tags: ['CSS', '色彩']
  },
  {
    icon: '🎵',
    title: '音频可视化',
    desc: '将音频波形可视化，创建炫酷的音乐频谱效果',
    path: '/experiments/audio-visualizer',
    tags: ['Web Audio', '可视化']
  },
  {
    icon: '🔮',
    title: '3D 旋转立方体',
    desc: '使用 CSS 3D 变换创建旋转的立方体效果',
    path: '/experiments/3d-cube',
    tags: ['CSS 3D', '动画']
  },
  {
    icon: '🌊',
    title: '波浪动画',
    desc: '使用 SVG 路径动画创建流畅的波浪效果',
    path: '/experiments/wave-animation',
    tags: ['SVG', '动画']
  },
  {
    icon: '💫',
    title: '星空背景',
    desc: '创建动态的星空背景，包含闪烁和移动的星星',
    path: '/experiments/starry-night',
    tags: ['Canvas', '动画']
  }
]

const navigateTo = (path) => {
  router.push(path)
}
</script>

<style scoped>
.experiments {
  padding: var(--spacing-lg);
  max-width: 1200px;
  margin: 0 auto;
  animation: fadeIn 0.5s ease;
}

.page-title {
  font-size: 2rem;
  margin-bottom: var(--spacing-sm);
  text-align: center;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.page-subtitle {
  font-size: 1rem;
  color: var(--text-secondary);
  text-align: center;
  margin-bottom: var(--spacing-xl);
}

.experiments-grid {
  display: grid;
  gap: var(--spacing-md);
}

.experiment-card {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 1.5rem;
  cursor: pointer;
  transition: all var(--transition-normal);
  position: relative;
  overflow: hidden;
}

.experiment-card::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  background: var(--gradient-primary);
  opacity: 0;
  transition: opacity var(--transition-normal);
}

.experiment-card:hover {
  transform: translateX(8px);
  background: rgba(124, 58, 237, 0.08);
}

.experiment-card:hover::before {
  opacity: 1;
}

.card-icon {
  font-size: 2.5rem;
  flex-shrink: 0;
}

.card-content {
  flex: 1;
}

.card-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #f1f5f9;
  margin: 0 0 0.5rem;
}

.card-desc {
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin: 0 0 0.75rem;
  line-height: 1.6;
}

.card-tags {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.tag {
  padding: 0.25rem 0.75rem;
  border-radius: var(--radius-full);
  font-size: 0.75rem;
  background: rgba(124, 58, 237, 0.15);
  color: #a78bfa;
  border: 1px solid rgba(124, 58, 237, 0.2);
}

.card-arrow {
  font-size: 1.5rem;
  color: var(--text-tertiary);
  transition: all var(--transition-normal);
}

.experiment-card:hover .card-arrow {
  color: var(--primary-color);
  transform: translateX(5px);
}

.empty-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  cursor: default;
}

.empty-card:hover {
  transform: none;
  background: transparent;
}

.empty-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.empty-text {
  font-size: 1.1rem;
  color: var(--text-secondary);
  margin: 0 0 0.5rem;
}

.empty-hint {
  font-size: 0.9rem;
  color: var(--text-tertiary);
  margin: 0;
}

.section-info {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin-top: var(--spacing-xl);
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.03);
  border-radius: var(--radius-md);
}

.info-icon {
  width: 24px;
  height: 24px;
  color: var(--primary-color);
  flex-shrink: 0;
  margin-top: 0.25rem;
}

.info-text {
  font-size: 0.9rem;
  color: var(--text-secondary);
  line-height: 1.6;
  margin: 0;
}

@media (max-width: 767px) {
  .experiments {
    padding: var(--spacing-sm);
  }

  .page-title {
    font-size: 1.5rem;
  }

  .experiment-card {
    padding: 1rem;
    gap: 1rem;
  }

  .card-icon {
    font-size: 2rem;
  }

  .card-title {
    font-size: 1.1rem;
  }

  .card-desc {
    font-size: 0.85rem;
  }

  .section-info {
    flex-direction: column;
    align-items: center;
    text-align: center;
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

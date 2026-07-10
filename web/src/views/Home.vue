<template>
  <div class="home">
    <!-- 标题区域 -->
    <div class="header-section">
      <h1 class="main-title">在线工具集合</h1>
      <p class="subtitle">便捷 · 安全 · 高效</p>
    </div>

    <!-- 工具卡片网格 -->
    <div class="tools-grid">
      <ToolCard
        v-for="(tool, index) in tools"
        :key="tool.path"
        :icon="tool.icon"
        :title="tool.title"
        :desc="tool.desc"
        :path="tool.path"
        :style="{ animationDelay: `${index * 100}ms` }"
      />
    </div>
  </div>
</template>

<script setup>
import ToolCard from '@/components/ToolCard.vue'

const tools = [
  {
    icon: '📋',
    title: 'JSON 格式化',
    desc: '格式化、压缩、校验 JSON 数据',
    path: '/json-formatter'
  },
  {
    icon: '🖼️',
    title: '图片转 Base64',
    desc: '将图片转换为 Base64 编码',
    path: '/image-to-base64'
  },
  {
    icon: '📱',
    title: '二维码生成',
    desc: '生成自定义样式的二维码',
    path: '/qrcode-generator'
  }
]
</script>

<style scoped>
.home {
  min-height: 100vh;
  padding: var(--spacing-xl) var(--spacing-md);
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* 标题区域 */
.header-section {
  text-align: center;
  margin-bottom: var(--spacing-xl);
  animation: fadeIn 0.8s ease;
}

.main-title {
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: var(--spacing-sm);
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: glow 3s ease-in-out infinite;
  position: relative;
}

.main-title::before {
  content: '在线工具集合';
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: blur(20px);
  opacity: 0.5;
  z-index: -1;
}

.subtitle {
  font-size: 1.25rem;
  color: var(--text-secondary);
  letter-spacing: 0.5rem;
}

/* 工具卡片网格 */
.tools-grid {
  display: grid;
  gap: var(--spacing-md);
  width: 100%;
  max-width: 1400px;
  padding: var(--spacing-md);
  grid-template-columns: repeat(1, 1fr);
}

/* 响应式布局 */
@media (min-width: 768px) {
  .home {
    padding: var(--spacing-xl) var(--spacing-lg);
  }
  
  .tools-grid {
    grid-template-columns: repeat(2, 1fr);
    padding: var(--spacing-lg);
  }
}

@media (min-width: 1024px) {
  .home {
    padding: var(--spacing-xl) var(--spacing-xl);
  }
  
  .tools-grid {
    grid-template-columns: repeat(3, 1fr);
    padding: 48px;
  }
}

@media (min-width: 1280px) {
  .tools-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

/* 动画 */
@keyframes glow {
  0%, 100% {
    filter: drop-shadow(0 0 10px rgba(124, 58, 237, 0.5));
  }
  50% {
    filter: drop-shadow(0 0 25px rgba(124, 58, 237, 0.8));
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>

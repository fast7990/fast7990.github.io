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
        :external="tool.external"
        :style="{ animationDelay: `${index * 100}ms` }"
      />
    </div>

    <!-- 联系方式区域 -->
    <div class="contact-section">
      <div class="contact-content">
        <svg class="contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
          <polyline points="22,6 12,13 2,6"/>
        </svg>
        <p class="contact-text">有任何意见或建议，请发送邮件至：</p>
        <a href="mailto:fast7990@outlook.com" class="contact-email">fast7990@outlook.com</a>
      </div>
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
  },
  {
    icon: '📝',
    title: 'Markdown 预览',
    desc: '实时编辑与预览 Markdown 文档',
    path: '/markdown-preview'
  },
  {
    icon: '🗺️',
    title: 'LifeMap 人生轨迹地图',
    desc: '记录人生中的重要地点与轨迹',
    path: 'https://fast7990.github.io/page/lifemap/index.html',
    external: true
  },
  {
    icon: '🌍',
    title: '3D 数字地球',
    desc: '交互式 3D 数字地球，探索全球数据可视化',
    path: 'https://fast7990.github.io/page/earth3d/index.html',
    external: true
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

/* 联系方式区域 */
.contact-section {
  margin-top: var(--spacing-xl);
  padding: var(--spacing-lg);
  width: 100%;
  max-width: 600px;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-lg);
  animation: fadeIn 0.8s ease 0.5s both;
}

.contact-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-sm);
  text-align: center;
}

.contact-icon {
  width: 40px;
  height: 40px;
  color: var(--primary-color);
  margin-bottom: var(--spacing-xs);
}

.contact-text {
  font-size: 0.95rem;
  color: var(--text-secondary);
  margin: 0;
}

.contact-email {
  font-size: 1.1rem;
  font-weight: 500;
  color: var(--secondary-color);
  text-decoration: none;
  background: linear-gradient(135deg, var(--secondary-color) 0%, var(--primary-color) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  transition: all 0.3s ease;
  padding: 0.5rem 1rem;
  border-radius: 6px;
}

.contact-email:hover {
  background: rgba(6, 182, 212, 0.1);
  -webkit-text-fill-color: var(--secondary-color);
  box-shadow: 0 0 20px rgba(6, 182, 212, 0.3);
}

.contact-email:active {
  transform: scale(0.98);
}

/* 响应式适配 */
@media (max-width: 768px) {
  .contact-section {
    padding: var(--spacing-md);
    margin-top: var(--spacing-lg);
  }
  
  .contact-text {
    font-size: 0.875rem;
  }
  
  .contact-email {
    font-size: 1rem;
    word-break: break-all;
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

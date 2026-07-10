<template>
  <div class="about">
    <h1 class="page-title">关于</h1>

    <!-- 项目介绍 -->
    <GlassContainer class="section">
      <div class="section-header">
        <svg class="section-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
          <polyline points="22 4 12 14.01 9 11.01"/>
        </svg>
        <h2 class="section-title">项目介绍</h2>
      </div>
      <p class="section-text">
        在线工具集合是一个基于 Vue 3 + Vite 构建的在线工具网站，旨在为用户提供便捷、安全、高效的实用工具。
        所有工具功能均在浏览器端完成，无需上传服务器，保护您的隐私安全。
      </p>
    </GlassContainer>

    <!-- 技术栈 -->
    <GlassContainer class="section">
      <div class="section-header">
        <svg class="section-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="3" y="3" width="7" height="7"/>
          <rect x="14" y="3" width="7" height="7"/>
          <rect x="14" y="14" width="7" height="7"/>
          <rect x="3" y="14" width="7" height="7"/>
        </svg>
        <h2 class="section-title">技术栈</h2>
      </div>
      <div class="tech-stack">
        <div class="tech-item" v-for="tech in techStack" :key="tech.name">
          <span class="tech-icon">{{ tech.icon }}</span>
          <div class="tech-info">
            <span class="tech-name">{{ tech.name }}</span>
            <span class="tech-desc">{{ tech.desc }}</span>
          </div>
        </div>
      </div>
    </GlassContainer>

    <!-- 功能列表 -->
    <GlassContainer class="section">
      <div class="section-header">
        <svg class="section-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
        </svg>
        <h2 class="section-title">功能列表</h2>
      </div>
      <div class="feature-list">
        <div class="feature-item" v-for="feature in features" :key="feature.title">
          <span class="feature-icon">{{ feature.icon }}</span>
          <div class="feature-info">
            <span class="feature-title">{{ feature.title }}</span>
            <span class="feature-desc">{{ feature.desc }}</span>
          </div>
        </div>
      </div>
    </GlassContainer>

    <!-- 隐私声明 -->
    <GlassContainer class="section">
      <div class="section-header">
        <svg class="section-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        </svg>
        <h2 class="section-title">隐私声明</h2>
      </div>
      <div class="privacy-content">
        <div class="privacy-item">
          <span class="privacy-check">✓</span>
          <span class="privacy-text">所有数据处理均在浏览器端完成，不会上传到任何服务器</span>
        </div>
        <div class="privacy-item">
          <span class="privacy-check">✓</span>
          <span class="privacy-text">您的文件、文本、图片等信息仅存在于本地浏览器中</span>
        </div>
        <div class="privacy-item">
          <span class="privacy-check">✓</span>
          <span class="privacy-text">关闭浏览器后，临时数据将被清除</span>
        </div>
        <div class="privacy-item">
          <span class="privacy-check">✓</span>
          <span class="privacy-text">无需注册账号，无需登录，即开即用</span>
        </div>
      </div>
    </GlassContainer>

    <!-- 联系方式 -->
    <GlassContainer class="section contact-section">
      <div class="section-header">
        <svg class="section-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
          <polyline points="22,6 12,13 2,6"/>
        </svg>
        <h2 class="section-title">联系方式</h2>
      </div>
      <div class="contact-content">
        <p class="contact-text">有任何意见或建议，请发送邮件至：</p>
        <a href="mailto:fast7990@outlook.com" class="contact-email">fast7990@outlook.com</a>
      </div>
    </GlassContainer>

    <!-- 页脚 -->
    <div class="footer">
      <p class="footer-text">© 2026 在线工具集合 | 基于 Vue 3 + Vite 构建</p>
      <a href="https://github.com/fast7990" target="_blank" class="footer-link">GitHub</a>
    </div>
  </div>
</template>

<script setup>
import GlassContainer from '../components/GlassContainer.vue'

const techStack = [
  { icon: '💚', name: 'Vue 3', desc: '渐进式 JavaScript 框架' },
  { icon: '⚡', name: 'Vite', desc: '下一代前端构建工具' },
  { icon: '🔗', name: 'Vue Router', desc: 'Vue.js 官方路由管理器' },
  { icon: '✨', name: 'tsparticles', desc: '高性能粒子动画库' },
  { icon: '📦', name: 'markdown-it', desc: 'Markdown 解析器' },
  { icon: '📱', name: 'qrcode', desc: '二维码生成库' }
]

const features = [
  { icon: '📋', title: 'JSON 格式化', desc: '格式化、压缩、校验 JSON 数据' },
  { icon: '🖼️', title: '图片转 Base64', desc: '将图片转换为 Base64 编码' },
  { icon: '📱', title: '二维码生成', desc: '生成自定义样式的二维码' },
  { icon: '📝', title: 'Markdown 预览', desc: '实时编辑与预览 Markdown 文档' }
]
</script>

<style scoped>
.about {
  padding: var(--spacing-lg);
  max-width: 900px;
  margin: 0 auto;
  animation: fadeIn 0.5s ease;
}

.page-title {
  font-size: 2rem;
  margin-bottom: var(--spacing-xl);
  text-align: center;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.section {
  padding: 2rem;
  margin-bottom: var(--spacing-md);
}

.section-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.section-icon {
  width: 28px;
  height: 28px;
  color: var(--primary-color);
}

.section-title {
  font-size: 1.35rem;
  font-weight: 600;
  color: #f1f5f9;
  margin: 0;
}

.section-text {
  color: var(--text-secondary);
  font-size: 1rem;
  line-height: 1.8;
  margin: 0;
}

/* 技术栈 */
.tech-stack {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.tech-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.02);
  border-radius: var(--radius-sm);
  transition: background var(--transition-normal);
}

.tech-item:hover {
  background: rgba(255, 255, 255, 0.05);
}

.tech-icon {
  font-size: 1.5rem;
}

.tech-info {
  display: flex;
  flex-direction: column;
}

.tech-name {
  font-size: 0.95rem;
  font-weight: 500;
  color: #f1f5f9;
}

.tech-desc {
  font-size: 0.75rem;
  color: var(--text-tertiary);
}

/* 功能列表 */
.feature-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.02);
  border-radius: var(--radius-sm);
  transition: all var(--transition-normal);
}

.feature-item:hover {
  background: rgba(255, 255, 255, 0.05);
  transform: translateX(5px);
}

.feature-icon {
  font-size: 1.5rem;
}

.feature-info {
  display: flex;
  flex-direction: column;
}

.feature-title {
  font-size: 0.95rem;
  font-weight: 500;
  color: #f1f5f9;
}

.feature-desc {
  font-size: 0.8rem;
  color: var(--text-tertiary);
}

/* 隐私声明 */
.privacy-content {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.privacy-item {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
}

.privacy-check {
  color: #22c55e;
  font-weight: bold;
  font-size: 1rem;
  flex-shrink: 0;
}

.privacy-text {
  color: var(--text-secondary);
  font-size: 0.9rem;
  line-height: 1.6;
}

/* 联系方式 */
.contact-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
}

.contact-text {
  color: var(--text-secondary);
  font-size: 0.95rem;
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

/* 页脚 */
.footer {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  padding: 2rem;
  margin-top: var(--spacing-xl);
}

.footer-text {
  color: var(--text-tertiary);
  font-size: 0.85rem;
  margin: 0;
}

.footer-link {
  color: var(--primary-color);
  text-decoration: none;
  font-size: 0.85rem;
  transition: color var(--transition-normal);
}

.footer-link:hover {
  color: var(--secondary-color);
}

@media (max-width: 767px) {
  .about {
    padding: var(--spacing-sm);
  }

  .page-title {
    font-size: 1.5rem;
  }

  .section {
    padding: 1.5rem;
  }

  .tech-stack {
    grid-template-columns: 1fr;
  }

  .footer {
    flex-direction: column;
    gap: 0.5rem;
    padding: 1.5rem;
  }

  .footer-text {
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

<template>
  <!-- 外部链接使用 a 标签，内部路由使用 router-link -->
  <a v-if="external" :href="path" target="_blank" rel="noopener noreferrer" class="tool-card tx">
    <div class="tool-card__icon">{{ icon }}</div>
    <h3 class="tool-card__title">{{ title }}</h3>
    <p class="tool-card__desc">{{ desc }}</p>
  </a>
  <router-link v-else :to="path" class="tool-card tc">
    <div class="tool-card__icon">{{ icon }}</div>
    <h3 class="tool-card__title">{{ title }}</h3>
    <p class="tool-card__desc">{{ desc }}</p>
  </router-link>
</template>

<script setup>
defineProps({
  icon: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    required: true
  },
  path: {
    type: String,
    required: true
  },
  // 是否为外部链接
  external: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped>
.tool-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: var(--spacing-lg);
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-md);
  backdrop-filter: blur(10px);
  text-align: center;
  transition: all var(--transition-normal);
  opacity: 0;
  animation: fadeIn 0.6s ease forwards;
  animation-delay: var(--animation-delay, 0s);
  cursor: pointer;
  text-decoration: none;
}

.tool-card:hover {
  transform: translateY(-8px);
  border-color: var(--primary-color);
  box-shadow: var(--glow-hover);
}

.tool-card__icon {
  font-size: 3rem;
  margin-bottom: var(--spacing-sm);
  transition: transform var(--transition-normal);
}

.tool-card:hover .tool-card__icon {
  transform: scale(1.2) rotate(5deg);
}

.tool-card__title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: var(--spacing-xs);
}

.tool-card__desc {
  font-size: 0.9rem;
  color: var(--text-secondary);
  line-height: 1.5;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>

<template>
  <div class="glass-container" :class="{ 'glass-container--hover': hover }">
    <slot></slot>
  </div>
</template>

<script setup>
defineProps({
  hover: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped>
.glass-container {
  background: var(--glass-bg);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-radius: var(--radius-md);
  border: 1px solid var(--glass-border);
  padding: var(--spacing-lg);
  transition: all var(--transition-normal);
}

.glass-container--hover:hover {
  border-color: rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  transform: translateY(-2px);
}

/* Responsive padding */
@media (max-width: 768px) {
  .glass-container {
    padding: var(--spacing-md);
  }
}

@media (max-width: 480px) {
  .glass-container {
    padding: var(--spacing-sm);
  }
}
</style>

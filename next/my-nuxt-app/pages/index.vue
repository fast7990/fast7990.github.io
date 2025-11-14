<template>
  <div class="container">
    <h1>Welcome to My Nuxt.js App!</h1>
    <p>This is a simple Nuxt.js application.</p>
    <NuxtLink to="/about">About Page</NuxtLink>
  </div>
</template>

<script setup lang="ts">
// 在这里可以添加页面逻辑
</script>

<style scoped>
.container {
  font-family: Arial, sans-serif;
  text-align: center;
  padding: 2rem;
}

h1 {
  color: #00c58e;
}
</style>
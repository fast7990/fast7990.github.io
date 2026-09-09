<template>
  <div class="container">
    <div class="card">
      <h1>Welcome!</h1>
      <p>This is a simple application.</p>
      <div class="links">
        <NuxtLink to="/about" class="nav-link">About Page</NuxtLink>
        <NuxtLink to="/test" class="nav-link">Test Page</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 在这里可以添加页面逻辑
</script>

<style scoped>
.container {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 2rem;
}

.card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  padding: 2.5rem;
  width: 100%;
  max-width: 600px;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
}

h1 {
  color: #2c3e50;
  margin-bottom: 1rem;
  font-size: 2.5rem;
  font-weight: 700;
}

p {
  color: #7f8c8d;
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
}

.links {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.nav-link {
  display: inline-block;
  color: #3498db;
  text-decoration: none;
  font-weight: 600;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  border: 2px solid #3498db;
  margin: 0.5rem;
}

.nav-link:hover {
  background-color: #3498db;
  color: white;
  transform: translateY(-3px);
  box-shadow: 0 7px 15px rgba(52, 152, 219, 0.3);
}
</style>
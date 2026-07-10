<template>
  <div id="app">
    <!-- 粒子背景 -->
    <ParticlesBg />

    <!-- 导航栏 -->
    <NavBar />

    <!-- 主内容区 -->
    <main class="main-content">
      <router-view v-slot="{ Component }">
        <transition name="slide-fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
  </div>
</template>

<script setup>
import ParticlesBg from './components/ParticlesBg.vue'
import NavBar from './components/NavBar.vue'
</script>

<style>
#app {
  width: 100%;
  min-height: 100vh;
  position: relative;
}

.main-content {
  position: relative;
  z-index: 1;
  padding-top: 80px; /* 为固定导航栏留出空间 */
  min-height: 100vh;
}
</style>

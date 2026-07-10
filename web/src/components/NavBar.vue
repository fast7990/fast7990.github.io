<template>
  <nav class="navbar">
    <div class="navbar-container">
      <!-- Logo -->
      <div class="navbar-logo" @click="router.push('/')">
        <span class="logo-icon">🛠️</span>
        <span class="logo-text">工具集</span>
      </div>

      <!-- Desktop Navigation -->
      <div class="navbar-links" v-if="!isMobile">
        <router-link to="/" class="nav-link">首页</router-link>
        <router-link to="/experiments" class="nav-link">趣味小实验</router-link>
        <a href="https://github.com/fast7990" target="_blank" class="nav-link">GitHub</a>
        <router-link to="/about" class="nav-link">关于</router-link>
      </div>

      <!-- Mobile Hamburger Menu -->
      <button class="hamburger-menu" v-if="isMobile" @click="toggleDrawer">
        <span class="hamburger-icon">☰</span>
      </button>
    </div>

    <!-- Mobile Drawer -->
    <Transition name="drawer">
      <div class="mobile-drawer" v-if="showDrawer" @click.self="toggleDrawer">
        <div class="drawer-content">
          <div class="drawer-header">
            <span class="logo-icon">🛠️</span>
            <span class="logo-text">工具集</span>
            <button class="close-btn" @click="toggleDrawer">×</button>
          </div>
          <div class="drawer-links">
            <router-link to="/" class="drawer-link" @click="toggleDrawer">首页</router-link>
            <router-link to="/experiments" class="drawer-link" @click="toggleDrawer">趣味小实验</router-link>
            <a href="https://github.com/fast7990" target="_blank" class="drawer-link" @click="toggleDrawer">GitHub</a>
            <router-link to="/about" class="drawer-link" @click="toggleDrawer">关于</router-link>
          </div>
        </div>
      </div>
    </Transition>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useResponsive } from '../composables/useResponsive'

const router = useRouter()
const { isMobile } = useResponsive()
const showDrawer = ref(false)

const toggleDrawer = () => {
  showDrawer.value = !showDrawer.value
}
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.navbar-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.navbar-logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: opacity 0.3s ease;
}

.navbar-logo:hover {
  opacity: 0.8;
}

.logo-icon {
  font-size: 1.5rem;
}

.logo-text {
  font-size: 1.25rem;
  font-weight: 600;
  background: linear-gradient(135deg, #7c3aed 0%, #06b6d4 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.navbar-links {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.nav-link {
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  font-size: 0.95rem;
  transition: color 0.3s ease;
  position: relative;
}

.nav-link:hover {
  color: #ffffff;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, #7c3aed 0%, #06b6d4 100%);
  transition: width 0.3s ease;
}

.nav-link:hover::after,
.nav-link.router-link-active::after {
  width: 100%;
}

.hamburger-menu {
  background: none;
  border: none;
  color: #ffffff;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  transition: opacity 0.3s ease;
}

.hamburger-menu:hover {
  opacity: 0.8;
}

.mobile-drawer {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 200;
  display: flex;
  justify-content: flex-end;
}

.drawer-content {
  width: 280px;
  max-width: 80vw;
  height: 100%;
  background: rgba(20, 20, 40, 0.95);
  backdrop-filter: blur(20px);
  border-left: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  animation: slideIn 0.3s ease;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}

.drawer-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.drawer-header .logo-icon {
  font-size: 1.5rem;
}

.drawer-header .logo-text {
  flex: 1;
  margin-left: 0.5rem;
  font-size: 1.25rem;
  font-weight: 600;
  background: linear-gradient(135deg, #7c3aed 0%, #06b6d4 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.close-btn {
  background: none;
  border: none;
  color: #ffffff;
  font-size: 2rem;
  cursor: pointer;
  padding: 0;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.3s ease;
}

.close-btn:hover {
  opacity: 0.8;
}

.drawer-links {
  display: flex;
  flex-direction: column;
  padding: 1rem 0;
}

.drawer-link {
  padding: 1rem 1.5rem;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  font-size: 1rem;
  transition: all 0.3s ease;
  border-left: 3px solid transparent;
}

.drawer-link:hover,
.drawer-link.router-link-active {
  background: rgba(255, 255, 255, 0.05);
  color: #ffffff;
  border-left-color: #7c3aed;
}

/* Drawer Transition */
.drawer-enter-active,
.drawer-leave-active {
  transition: opacity 0.3s ease;
}

.drawer-enter-from,
.drawer-leave-to {
  opacity: 0;
}

/* Responsive */
@media (max-width: 768px) {
  .navbar-container {
    padding: 1rem 1.5rem;
  }
}
</style>

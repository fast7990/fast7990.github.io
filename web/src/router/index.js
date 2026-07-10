import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/json-formatter',
    name: 'json-formatter',
    component: () => import('../views/JsonFormatter.vue')
  },
  {
    path: '/image-to-base64',
    name: 'image-to-base64',
    component: () => import('../views/ImageToBase64.vue')
  },
  {
    path: '/qrcode-generator',
    name: 'qrcode-generator',
    component: () => import('../views/QrcodeGenerator.vue')
  },
  {
    path: '/markdown-preview',
    name: 'markdown-preview',
    component: () => import('../views/MarkdownPreview.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/About.vue')
  },
  {
    path: '/experiments',
    name: 'experiments',
    component: () => import('../views/Experiments.vue')
  },
  {
    path: '/experiments/particle-collision',
    name: 'particle-collision',
    component: () => import('../views/experiments/ParticleCollision.vue')
  },
  {
    path: '/experiments/gradient-generator',
    name: 'gradient-generator',
    component: () => import('../views/experiments/GradientGenerator.vue')
  },
  {
    path: '/experiments/audio-visualizer',
    name: 'audio-visualizer',
    component: () => import('../views/experiments/AudioVisualizer.vue')
  },
  {
    path: '/experiments/3d-cube',
    name: '3d-cube',
    component: () => import('../views/experiments/Cube3d.vue')
  },
  {
    path: '/experiments/wave-animation',
    name: 'wave-animation',
    component: () => import('../views/experiments/WaveAnimation.vue')
  },
  {
    path: '/experiments/starry-night',
    name: 'starry-night',
    component: () => import('../views/experiments/StarryNight.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

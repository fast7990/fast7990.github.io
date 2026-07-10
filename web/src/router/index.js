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
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

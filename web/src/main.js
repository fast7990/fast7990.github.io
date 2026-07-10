import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Particles from '@tsparticles/vue3'
import { loadFull } from 'tsparticles'

// 导入全局样式
import './assets/styles/global.css'

// 创建 Vue 应用实例
const app = createApp(App)

// 使用路由
app.use(router)

// 使用粒子插件
app.use(Particles, {
  init: async (engine) => {
    await loadFull(engine)
  }
})

// 挂载应用
app.mount('#app')

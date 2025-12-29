import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import ElementPlusX from 'vue-element-plus-x'
import './assets/vue-element-plus-x.css'
import './style.css'
import App from './App.vue'

const app = createApp(App)

app.use(ElementPlus)
app.use(ElementPlusX)
app.mount('#app')

import { createApp } from "vue";
import { createPinia } from "pinia";
import "./styles/index.css";
import naive from 'naive-ui'
import App from "./App.vue";
import router from "./router/index.ts"
import './style.css'
const pinia = createPinia();
const app = createApp(App);

app.use(pinia).use(router).use(naive).mount("#app");

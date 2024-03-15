/*
 * @Author: v-huangshaopeng v-huangshaopeng@360.cn
 * @Date: 2024-03-15 17:10:16
 * @LastEditors: v-huangshaopeng v-huangshaopeng@360.cn
 * @LastEditTime: 2024-03-15 18:43:01
 * @FilePath: \fast7990.github.io\webs\src\main.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createApp } from "vue";
import { createPinia } from "pinia";
import "./styles/index.css";
import naive from 'naive-ui'
import App from "./App.vue";
import router from "@/router"
const pinia = createPinia();
const app = createApp(App);

app.use(pinia).use(router).use(naive).mount("#app");

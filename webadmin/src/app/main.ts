/*
 * @Author: v-huangshaopeng v-huangshaopeng@360.cn
 * @Date: 2024-03-12 09:43:32
 * @LastEditors: v-huangshaopeng v-huangshaopeng@360.cn
 * @LastEditTime: 2024-03-12 10:23:14
 * @FilePath: \fast7990.github.io\webadmin\src\app\main.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import {createApp} from "vue"
import App from "./App.vue"
import "animate.css"
import "@/app/web/style/index.less"
import "@/packages/style/reset.less"
import setupIcons from "@/packages/config/icon.ts"
createApp(App).use(setupIcons).mount("#app")
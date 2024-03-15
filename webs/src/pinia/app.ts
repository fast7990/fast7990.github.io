/*
 * @Author: v-huangshaopeng v-huangshaopeng@360.cn
 * @Date: 2024-03-15 17:23:21
 * @LastEditors: v-huangshaopeng v-huangshaopeng@360.cn
 * @LastEditTime: 2024-03-15 18:20:28
 * @FilePath: \fast7990.github.io\webs\src\pinia\app.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { defineStore } from "pinia";

// 你可以任意命名 `defineStore()` 的返回值，但最好使用 store 的名字，同时以 `use` 开头且以 `Store` 结尾。
// (比如 `useUserStore`，`useCartStore`，`useProductStore`)
// 第一个参数是你的应用中 Store 的唯一 ID。
const appStore = defineStore("common", {
  state: () => ({
    allMenus: [], // 所有菜单
    userSetting: {
      // 主题设置
      layoutName: "ml", // 主题名称
      themeColor: "#519a73", // 主题颜色
      themeName: null, // 主题模式 深色 和 白色
      language: "zhCN", // 语言
      tabsStyle: "sutra", // 标签风格
      hideTabs: false, // 隐藏标签
      lasting: false, // 标签持久化
      gray: false, // 灰色模式
      weak: false, // 色弱模式
      isFullscreen: false, // 全屏模式
      animation: "animate__slideInLeft", // 类型 参考animation.css
      disableAnimation: false, // 动画
      keepAlive: false, // 是否缓存
    },
  }),
  getters: {},
  actions: {
    increment() {},
  },
});
export default appStore;

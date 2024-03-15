"use strict";
exports.__esModule = true;
/*
 * @Author: v-huangshaopeng v-huangshaopeng@360.cn
 * @Date: 2024-03-15 17:23:21
 * @LastEditors: v-huangshaopeng v-huangshaopeng@360.cn
 * @LastEditTime: 2024-03-15 18:20:28
 * @FilePath: \fast7990.github.io\webs\src\pinia\app.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
var pinia_1 = require("pinia");
// 你可以任意命名 `defineStore()` 的返回值，但最好使用 store 的名字，同时以 `use` 开头且以 `Store` 结尾。
// (比如 `useUserStore`，`useCartStore`，`useProductStore`)
// 第一个参数是你的应用中 Store 的唯一 ID。
var appStore = pinia_1.defineStore("common", {
    state: function () { return ({
        allMenus: [],
        userSetting: {
            // 主题设置
            layoutName: "ml",
            themeColor: "#519a73",
            themeName: null,
            language: "zhCN",
            tabsStyle: "sutra",
            hideTabs: false,
            lasting: false,
            gray: false,
            weak: false,
            isFullscreen: false,
            animation: "animate__slideInLeft",
            disableAnimation: false,
            keepAlive: false
        }
    }); },
    getters: {},
    actions: {
        increment: function () { }
    }
});
exports["default"] = appStore;

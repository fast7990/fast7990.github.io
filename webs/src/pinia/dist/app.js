"use strict";
exports.__esModule = true;
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

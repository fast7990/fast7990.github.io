"use strict";
exports.__esModule = true;
var routerMap = [
    {
        path: "/",
        name: "main",
        component: function () { return Promise.resolve().then(function () { return require("@/layout/index.vue"); }); },
        redirect: "home",
        children: [
            {
                path: "/home",
                name: "home",
                meta: { title: "首页" },
                component: function () { return Promise.resolve().then(function () { return require("@/view/home/index.vue"); }); }
            },
            {
                path: "/news",
                name: "news",
                meta: { title: "新闻" },
                component: function () { return Promise.resolve().then(function () { return require("@/view/news/index.vue"); }); }
            },
        ]
    },
];
exports["default"] = routerMap;

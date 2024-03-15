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
        ]
    },
];
exports["default"] = routerMap;

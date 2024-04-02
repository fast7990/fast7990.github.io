import { RouteRecordRaw } from "vue-router";

const routerMap: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "main",
    component: () => import("@/layout/index.vue"),
    redirect: "home",
    children: [
      {
        path: "/home",
        name: "home",
        meta: { title: "首页" },
        component: () => import("@/view/home/index.vue"),
      },
      {
        path: "/news",
        name: "news",
        meta: { title: "新闻" },
        component: () => import("@/view/news/index.vue"),
      },
    ],
  },
  //   {
  //     path: "/:pathMatch(.*)*",
  //     meta: { title: "出错了" },
  //     component: error,
  //   },
];

export default routerMap;

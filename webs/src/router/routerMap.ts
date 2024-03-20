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
    ],
  },
  //   {
  //     path: "/:pathMatch(.*)*",
  //     meta: { title: "出错了" },
  //     component: error,
  //   },
];

export default routerMap;

/*
 * @Author: v-huangshaopeng v-huangshaopeng@360.cn
 * @Date: 2024-03-15 17:39:19
 * @LastEditors: v-huangshaopeng v-huangshaopeng@360.cn
 * @LastEditTime: 2024-03-15 17:47:57
 * @FilePath: \fast7990.github.io\webs\src\router\routerMap.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
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

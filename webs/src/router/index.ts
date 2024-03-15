import * as vueRouter from "vue-router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import {
  createWebHashHistory,
  RouterOptions,
  RouteLocationNormalized,
} from "vue-router";
import routerMap from "./routerMap";
const history = createWebHashHistory();
const router = vueRouter.createRouter({
  history: history,
  routes: routerMap,
} as RouterOptions);
// router.beforeEach((to, from, next) => {
//   NProgress.start();
//   beforeEach(to, from, next);
// });

// router.afterEach((to: RouteLocationNormalized) => {
//   NProgress.done();
//   afterEach(to);
// });
export default router
/**
 * Vue router
 * @description Vue router
 * @author Zhong Li
 * @version 1.0.0
 * @since v1.0.0
 */

import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

/* Expand routes */
import expandRoutes from "@/router";

const routes = [
  {
    path: "/login",
    component: () => import("@/views/login/index"),
  },
  {
    path: "/404",
    component: () => import("@/views/error/404"),
  },
  {
    path: "/401",
    component: () => import("@/views/error/401"),
  },
].concat(expandRoutes);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;

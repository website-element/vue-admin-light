import router from "./router";
import store from "./store";

/** NProgress */
import NProgress from "nprogress";
import "nprogress/nprogress.css";

NProgress.configure({ showSpinner: false });

import { getAuthToken } from "./cookie/auth";

const pageLoginPath = "/login";
const pageHomePath = "/";

/* Route interceptor for beforeEach */
router.beforeEach((to, from, next) => {
  NProgress.start();
  if (getAuthToken()) {
    if (store.state.auth.loginInfo) {
      if (to.path === pageLoginPath) {
        next(pageHomePath);
      } else {
        next();
      }
    } else {
      store.dispatch("auth/updateLoginInfo").then(() => {
        store.dispatch("auth/updateRoutes").then(() => {
          next({ ...to, replace: true });
        });
      });
    }
  } else {
    store.dispatch("auth/clearLoginInfo").then(() => {
      if (to.path !== pageLoginPath) {
        next(pageLoginPath);
      } else {
        next();
      }
    });
  }
});

/* Route interceptor for afterEach  */
router.afterEach(() => {
  NProgress.done();
});

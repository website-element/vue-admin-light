/**
 * Store of auth
 * @description Store of auth
 * @author Zhong Li
 * @version 1.0.0
 * @since v1.0.0
 */
import { getLoginInfo, getRouter } from "@system/request/login";
import LayoutAdmin from "@system/layout/LayoutAdmin";
import router from "@system/router";

const state = {
  loginInfo: undefined,
  routes: [],
};

const mutations = {
  updateLoginInfo: (state, loginInfo) => {
    state.loginInfo = loginInfo;
  },

  clearLoginInfo: (state) => {
    state.loginInfo = undefined;
  },

  updateRoutes: (state, routes) => {
    state.routes = routes;
  },
};

const actions = {
  /** Update login info */
  updateLoginInfo: ({ commit }) => {
    return new Promise((resolve, reject) => {
      getLoginInfo()
        .then((res) => {
          commit("updateLoginInfo", res.data);
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  /** Clear login info */
  clearLoginInfo: ({ commit }) => {
    commit("clearLoginInfo");
  },

  /** Update router map */
  updateRoutes: ({ commit }) => {
    return new Promise((resolve, reject) => {
      getRouter()
        .then((res) => {
          let routes = parseRoutes(res.data);
          routes.push({ path: "*", redirect: "/404", meta: {} });
          routes.forEach((route) => {
            router.addRoute(route);
          });
          commit("updateRoutes", routes);
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};

/**
 * Lazy loading  view
 * @param {string} view - View path
 * @returns {component} - Vue component
 */
function loadView(view) {
  if (process.env.NODE_ENV === "development") {
    return (resolve) => require([`@/views/${view}`], resolve);
  } else {
    return () => import(`@/views/${view}`);
  }
}

/**
 * Parse router
 * @param {array} routes - Router date
 * @returns {array} Lazy loading router date
 */
function parseRoutes(routes) {
  routes.forEach((route) => {
    if (route.component === "LayoutAdmin") {
      route.component = LayoutAdmin;
    } else {
      route.component = loadView(route.component);
    }
    if (route.children && route.children.length > 0) {
      parseRoutes(route.children);
    }
  });
  return routes;
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};

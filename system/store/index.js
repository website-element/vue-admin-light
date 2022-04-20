/**
 * Store
 * @description Store
 * @author Zhong Li
 * @version 1.0.0
 * @since v1.0.0
 */

import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

/* Store modules */
import app from "./modules/app.js";
import auth from "./modules/auth.js";

/* Expand store */
import expandStore from "@/store";

export default new Vuex.Store({
  modules: {
    app,
    auth,
    ...expandStore,
  },
});

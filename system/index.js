/**
 * Main
 * @description App entrance
 * @author Zhong Li
 * @version 1.0.0
 * @since v1.0.0
 */

import Vue from "vue";
import App from "@/App.vue";
import router from "./router";
import store from "./store";

/** ElementUI */
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

Vue.use(ElementUI);

/** animate */
import animated from "animate.css";

Vue.use(animated);

Vue.config.productionTip = false;

/** CSS modules */
import "@system/assets/css/index.less";

/** Lib modules */
import "font-awesome/css/font-awesome.min.css";

/** System modules */
import "./prototype";
import "./permission";

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

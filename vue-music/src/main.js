import "babel-polyfill";
import Vue from "vue";
import App from "./App.vue";
import router from "./router/router";
import store from "./store/store";
import fastclick from "fastclick";
import "./common/stylus/index.styl";

import VueLazyload from "vue-lazyload";
Vue.use(VueLazyload, {
  error: require("common/image/default.png"),
  loading: require("common/image/default.png")
});

Vue.config.productionTip = false;

fastclick.attach(document.body);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

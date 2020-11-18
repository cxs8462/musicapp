import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Ele from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "amfe-flexible";
Vue.config.productionTip = false;
Vue.use(Ele);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

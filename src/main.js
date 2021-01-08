import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Ele from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "amfe-flexible";
import SocketIO from "socket.io-client";
import vueSccketIO from "vue-socket.io";

Vue.use(
  new vueSccketIO({
    debug: true,
    connection: SocketIO(process.env["VUE_APP_WS"])
  })
);

Vue.config.productionTip = false;
Vue.use(Ele);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

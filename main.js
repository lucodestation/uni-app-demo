import App from "./App";

// #ifndef VUE3
import Vue from "vue";

// #ifdef H5
import VConsole from "vconsole";
if (
  location.hostname.startsWith("localhost") ||
  location.hostname.startsWith("127.0.0.1") ||
  location.hostname.startsWith("192.168.")
) {
  new VConsole();
}
// #endif

Vue.config.productionTip = false;
App.mpType = "app";
const app = new Vue({
  ...App,
});
app.$mount();
// #endif

// #ifdef VUE3
import { createSSRApp } from "vue";
export function createApp() {
  const app = createSSRApp(App);
  return {
    app,
  };
}
// #endif

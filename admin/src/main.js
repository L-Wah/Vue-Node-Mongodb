import Vue from "vue";
import App from "./App.vue";
import "./plugins/element.js";
import router from "./router";

Vue.config.productionTip = false;
import "./style.css";
import http from "./http";

// 全局使用的代码块  computed计算属性，getAuthHeaders方法属性
Vue.mixin({
  computed: {
    uploadUrl() {
      return this.$http.defaults.baseURL + "/upload";
    },
  },

  methods: {
    getAuthHeaders() {
      return {
        Authorization: `Bearer ${sessionStorage.token || ""}`,
      };
    },
  },
});

Vue.prototype.$http = http;
new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");

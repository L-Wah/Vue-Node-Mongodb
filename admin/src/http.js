import axios from "axios";
import Vue from "vue";
const http = axios.create({
  baseURL: "http://localhost:3000/admin/api",
});
// 添加拦截器，
// request请求拦截
http.interceptors.request.use(
  function(config) {
    if (sessionStorage.token) {
      // Bearer后空格得留出来
      config.headers.Authorization = "Bearer " + sessionStorage.token;
      // console.log(config.headers.Authorization);
    }
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);
// response响应拦截
http.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    if (err.response.status === 401) {
      router.push("/login");
    }
    Vue.prototype.$message.error(err.response.data.message);
    return Promise.reject(err);
  }
);
export default http;

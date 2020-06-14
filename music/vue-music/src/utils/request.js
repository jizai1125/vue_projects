import axios from "axios";
import { Notify } from "vant";
// import router from "../router/router";

// create an axios instance
const service = axios.create({
  baseURL: "http://localhost:3000",
  // baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000, // request timeout
});

// request interceptor
service.interceptors.request.use(
  (config) => {
    // do something before request is sent
    if (localStorage.token) {
      config.headers.Authorization = `Bearer ${localStorage.token}`;
    }
    return config;
  },
  (error) => {
    // do something with request error
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  (response) => {
    const res = response.data;
    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== 200) {
      Notify({ type: "danger", message: res.msg });
      return Promise.reject(new Error(res.msg || "Error"));
    } else {
      return res;
    }
  },
  (error) => {
    const { code, msg } = error.response.data;
    console.log("err" + error); // for debug
    Notify({ type: "danger", message: msg || "错误" });

    return Promise.reject(error);
  }
);

export default service;

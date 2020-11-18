import axios from "axios";
import { Message } from "element-ui";
import store from "@/store/index";
const Axios = axios.create({
  withCredentials: true,
  baseURL: process.env["VUE_APP_BASE_API"]
});

Axios.interceptors.request.use(req => {
  store.commit("setLoading", true);
  return req;
});

Axios.interceptors.response.use(
  res => {
    store.commit("setLoading", false);
    if (res.status === 200) {
      if (res.data.code === 200||res.data.message) {
        return res.data;
      }
      Message.error(res.data.message);
    }
    return res;
  },
  error => {
    store.commit("setLoading", false);
    const res = error.response;
    if (res.data.code === 301) {
      Message.info("未登录状态");
    }
    return error;
  }
);

export const req = (url, data) =>
  Axios({
    method: "get",
    url,
    params: {
      ...data,
      timestamp: new Date().getTime()
    }
  });

export default Axios;

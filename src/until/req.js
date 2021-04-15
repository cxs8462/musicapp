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
    const data = res.data;
    if (data.code && data.code !== 200) {
      Message.warning(data.message);
    }
    if (data.code && data.code === 200 && data.message) {
      Message.success(data.message);
    }
    const data2 = data.data;
    if (data2) {
      if (data2.code && data2.code !== 200) {
        Message.warning(data2.message);
      }
    }
    return data;
  },
  error => {
    store.commit("setLoading", false);
    const res = error.response.data;
    if (res.code === 301) {
      return error;
    }
    Message.info(res.message || res.msg);
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

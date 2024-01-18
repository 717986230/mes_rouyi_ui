import axios from "axios";
import errorCode from "@/utils/errorCode";
import { Notification } from "element-ui";

const noInterceptorApi = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
  },
});
noInterceptorApi.interceptors.response.use((res) => {
  // 未设置状态码则默认成功状态
  const code = res.data.code || 200;
  // 获取错误信息
  const msg = errorCode[code] || res.data.msg || errorCode["default"];
  if (code !== 200) {
    // Notification.error({
    //   title: msg
    // })
    return Promise.reject("error");
  } else {
    return res.data;
  }
});
export default noInterceptorApi;

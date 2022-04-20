/**
 * request
 * @description Axios instance
 * @author Zhong Li
 * @version 1.0.0
 * @since v1.0.0
 */
import axios from "axios";
import { Message } from "element-ui";
import { getAuthToken, removeAuthToken } from "@system/cookie/auth";

axios.defaults.headers["Content-Type"] = "application/json;charset=utf-8";

/* Axios instance */
const request = axios.create({
  /* Base url */
  baseURL: process.env.VUE_APP_API_BASE_URL,
  /* Timeout */
  timeout: 30000,
});

/* Request interceptors */
request.interceptors.request.use(
  (config) => {
    if (getAuthToken()) {
      config.headers.Authorization = getAuthToken();
    }
    return config;
  },
  () => {
    Message.error("Initiating request exception");
  }
);

/* Response interceptors */
request.interceptors.response.use(
  (res) => {
    if (res.data.code === 0) {
      return res.data;
    } else if (res.data.code === 401) {
      removeAuthToken();
      Message.error(res.data.msg);
      return Promise.reject(res.data);
    } else {
      return Promise.reject(res.data);
    }
  },
  (error) => {
    Message.error(JSON.stringify(error));
    return Promise.reject(error);
  }
);

export default request;

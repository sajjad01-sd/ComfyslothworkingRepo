import { getToken } from "./helpers";
import axios from "axios";

const defaultOptions = {
    baseURL: process.env.REACT_APP_backend_link,

    headers: {
        "Content-Type": "application/json",
    }
};

let axiosInstance = axios.create(defaultOptions);

axiosInstance.interceptors.request.use(function (config) {
    let token = getToken();
    config.headers.Authorization = token ? `Bearer ${token}` : "";

    return config
})

export default axiosInstance;
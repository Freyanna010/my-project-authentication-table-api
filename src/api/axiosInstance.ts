import axios, { AxiosError, InternalAxiosRequestConfig} from "axios";
import loginStore from '../stores/loginStore';
import cloneDeep from "lodash/cloneDeep";

const BASE_URL = "https://test.v5.pryaniky.com"

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

const fulfilledRequestHandler = (configuration: InternalAxiosRequestConfig) => {
  const { token } = loginStore;
  const newConfig = cloneDeep(configuration);

  if (token && newConfig.headers) {
    newConfig.headers["x-auth"] = token;
  }

  return newConfig;
};

const rejectedRequestHandler = (error: AxiosError) => error;

axiosInstance.interceptors.request.use(
  fulfilledRequestHandler,
  rejectedRequestHandler,
);
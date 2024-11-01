//  TODO: 🦄оставить этот файл и apiService здесь в модуле Table или перенести в общую папку  api?
import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import loginStore from "../../Auth/stores/loginStore";
import cloneDeep from "lodash/cloneDeep";

// TODO: 🦄стоит ли перенести в файл константы на верхнем уровне приложения (использовать потом в loginStore тоже)?
const BASE_URL = "https://test.v5.pryaniky.com";

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

const fulfilledResponseHandler = (response: AxiosResponse) => {
  if (response.data.data.error_code === 2004) {
    loginStore.logout();
  }

  return response;
};

axiosInstance.interceptors.request.use(
  fulfilledRequestHandler,
  rejectedRequestHandler,
);

axiosInstance.interceptors.response.use(fulfilledResponseHandler);

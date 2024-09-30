import { AxiosRequestConfig as InternalAxiosRequestConfig } from "axios";
import { axiosInstance } from "./axiosInstance";


export const apiService = {
  async get<T>(url: string, config?: InternalAxiosRequestConfig): Promise<T> {
    const { data } = await axiosInstance.get<T>(url, config);
    return data;
  },

  async post<T, D>(
    url: string,
    body: D,
    config?: InternalAxiosRequestConfig
  ): Promise<T> {
    const { data } = await axiosInstance.post<T>(url, body, config);
    return data;
  },
  
  async put<T, D>(
    url: string,
    body: D,
    config?: InternalAxiosRequestConfig
  ): Promise<T> {
    const { data } = await axiosInstance.put<T>(url, body, config);
    return data;
  },

  async delete<T>(url: string, config?: InternalAxiosRequestConfig): Promise<T> {
    const { data } = await axiosInstance.delete<T>(url, config);
    return data;
  },
};

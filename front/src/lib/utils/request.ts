import axios, { AxiosResponse, AxiosRequestConfig } from "axios";
import { baseUrl } from "lib/variables/settings";

export type DataFormat = AxiosResponse["data"];

// Axios Request Mapper
async function request(option: AxiosRequestConfig): Promise<DataFormat> {
  if (!option.url || !option.method) return;

  try {
    const url = `${baseUrl}/api${option.url}`;
    const response = await axios({ ...option, url, withCredentials: true });
    return response.data || {};
  } catch (e) {
    if (e.response) {
      const { data, status, headers } = e.response;
      console.error(data, status, headers);
      if (data && data.error) {
        data.error.message = `[CODE: ${data.error.code}] ${data.error.message}`;
        alert(data.error.message);
      }

      return { error: data.error || new Error(data) };
    } else if (e.request) {
      console.error(e.request);
    } else {
      console.error("Error", e.message);
    }

    return {};
  }
}

function requestByMethod(method: AxiosRequestConfig["method"]) {
  return (url: AxiosRequestConfig["url"], option?: AxiosRequestConfig) => request({ ...option, url, method });
}

export default {
  get: requestByMethod("GET"),
  post: requestByMethod("POST"),
  put: requestByMethod("PUT"),
  delete: requestByMethod("DELETE"),
};

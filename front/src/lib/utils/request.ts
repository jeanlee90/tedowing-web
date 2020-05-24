import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

export type DataFormat = AxiosResponse["data"];

function logger(...args: any[]) {
  if (process.env.NODE_ENV === "development") console.log(args);
}

// Axios Request Mapper
async function request(option: AxiosRequestConfig): Promise<DataFormat> {
  if (!option.url) return;

  try {
    const response = await axios({ ...option, withCredentials: true });
    return response.data;
  } catch (e) {
    if (e.response) {
      const { data, status, headers } = e.response;
      logger(data, status, headers);
      if (data && data.error) data.error.message = `[CODE: ${data.error.code}] ${data.error.message}`;

      return { error: data.error || new Error(data) };
    } else if (e.request) {
      logger(e.request);
    } else {
      logger("Error", e.message);
    }

    logger(e);
  }
}

export default request;

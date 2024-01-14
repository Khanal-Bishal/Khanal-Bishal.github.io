import axios, { AxiosRequestConfig, AxiosError } from "axios";

const HTTP = axios.create({
  baseURL: "http://localhost:5000/api",
});

HTTP.interceptors.request.use(
  (request) => {
    const unparsedUserInfo = localStorage.getItem("userInfo") as any;
    const userInfo = JSON.parse(unparsedUserInfo);
    const token = userInfo?.accessToken;

    if (token) {
      request.headers["Authorization"] = `Bearer ${token}`;
    }
    return request;
  },

  (error) => {
    console.log("from requesrt interceptor", error);
    return error;
  }
);

HTTP.interceptors.response.use(
  (response) => {
    // Return the original response for successful requests

    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    const unparsedUserInfo = localStorage.getItem("userInfo") as any;
    const userInfo = JSON.parse(unparsedUserInfo);
    if (!userInfo) throw error;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      console.log(userInfo);

      const refreshToken = userInfo.refreshToken;

      try {
        const response = await HTTP.post("/user/token", {
          refreshToken,
        });

        const newAccessToken = response.data.accessToken;

        if (newAccessToken) {
          userInfo.accessToken = newAccessToken;
          localStorage.setItem("userInfo", JSON.stringify(userInfo));
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return HTTP(originalRequest);
        }
        return response;
      } catch (refreshError) {
        // Handle any errors that occur during token refresh
        console.error("Token refresh failed:", refreshError);
        throw refreshError;
      }
    }

    // Return the original error response for other cases
    return Promise.reject(error);
  }
);

export default HTTP;

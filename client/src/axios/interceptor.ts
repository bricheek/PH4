import axios from 'axios'
import { CLOUD_FUNCTIONS_ORIGIN } from '../functions-origin';

async function refreshToken() {
    //refresh token
    return
}


const axiosInstance = axios.create({
    baseURL: `${CLOUD_FUNCTIONS_ORIGIN}`
  // other configurations
})

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      // Attempt to refresh token
      try{
        const newToken = await refreshToken();
        axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;

        //clone the original request and retry
        const originalRequest = error.config;
        originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
        return axios(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
    }
}
    return Promise.reject(error)
  },
);

export default axiosInstance
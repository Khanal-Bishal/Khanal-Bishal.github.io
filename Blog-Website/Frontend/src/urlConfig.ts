import axios, { AxiosRequestConfig, AxiosError } from 'axios';

const unparsedUserInfo = localStorage.getItem('userInfo') as any
const userInfo = JSON.parse(unparsedUserInfo)

const HTTP = axios.create(
    {
        baseURL: 'http://localhost:5000/api',
    }
)

HTTP.interceptors.request.use((request) =>
    {         
        const token = userInfo.accessToken
        if(token)
        {
            request.headers['Authorization'] = `Bearer ${token}`

        }
        return request
    },

    (error) =>
    {
        return error
    }
)

HTTP.interceptors.response.use(
    (response) => {
        // Return the original response for successful requests
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            const refreshToken = userInfo.refreshToken;
            
            try {
                const response = await HTTP.post('/user/token', {
                    refreshToken 
                });

                const newAccessToken = response.data.accessToken;

                if (newAccessToken) {
                    userInfo.accessToken = newAccessToken;                    
                    localStorage.setItem('userInfo', JSON.stringify(userInfo));
                    originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    return HTTP(originalRequest);
                }
            } catch (refreshError) {
                // Handle any errors that occur during token refresh
                console.error('Token refresh failed:', refreshError);
            }
        }
        
        // Return the original error response for other cases
        return Promise.reject(error);
    }
);


export default HTTP

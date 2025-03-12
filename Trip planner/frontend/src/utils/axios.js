import axios from "axios";
import summaryAPI, { baseURL } from "../common/summaryApi";

const Axios = axios.create({
    baseURL: baseURL,
    withCredentials: true
});

// Sending access token in header
Axios.interceptors.request.use(
    async (config) => {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Handling response and refreshing token on 401 errors
Axios.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        let originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest.retry) {
            originalRequest.retry = true;
            const refreshToken = localStorage.getItem("refreshToken");

            if (refreshToken) {
                const newAccessToken = await refreshAccessToken(refreshToken);
                if (newAccessToken) {
                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                    return Axios(originalRequest);
                }
            }
        }
        return Promise.reject(error);
    }
);

// Function to refresh access token
const refreshAccessToken = async (refreshToken) => {
    try {
        const response = await Axios({
            ...summaryAPI.refreshToken,
            headers: {
                Authorization: `Bearer ${refreshToken}`
            }
        });

        const accessToken = response.data.data.accessToken;
        localStorage.setItem("accessToken", accessToken);
        return accessToken;
    } catch (error) {
        console.log(error);
        return null;
    }
};

export default Axios;

import axios from 'axios';
import { toast } from 'react-toastify';
import Cookies from 'universal-cookie';
const cookies = new Cookies(null, { path: '/' });

const BASE_URL = 'http://localhost:8085/v1';
export const instance = axios.create({
    baseURL: BASE_URL,
});

instance.interceptors.request.use(
    (config) => {
        const token = cookies.get('accessToken');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

instance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalConfig = error.config;
        console.log(originalConfig);
        console.log('Access Token expired');
        if (error.response && error.response.status === 419) {
            try {
                const refreshToken = cookies.get('refreshToken');
                const result = await instance.post(`${BASE_URL}/user/refresh-token`, {
                    refreshToken: refreshToken,
                });
                const { accessToken } = result.data;
                cookies.set('accessToken', accessToken);
                originalConfig.headers['Authorization'] = `Bearer ${accessToken}`;

                return instance(originalConfig);
            } catch (err) {
                if (err.response && err.response.status === 403) {
                    toast.error('Login session has expired, please log in again.', {
                        position: 'top-center',
                    });
                    setTimeout(() => {
                        cookies.remove('accessToken');
                        cookies.remove('refreshToken');
                        localStorage.removeItem('user');
                        window.location.href = '/login';
                    }, 2000);
                }
                return Promise.reject(err);
            }
        }
        return Promise.reject(error);
    },
);

export const get = async (path, params) => {
    try {
        const res = await instance.get(path, params);
        return res.data;
    } catch (error) {
        return error;
    }
};

export const post = async (path, data, config = {}) => {
    const res = await instance.post(path, data, { ...config });
    return res.data;
};

export const put = async (path, data) => {
    const res = await instance.put(path, data);
    return res.data;
};

export const remove = async (path, data) => {
    const res = await instance.delete(path, { data });
    return res.data;
};

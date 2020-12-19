import axios from 'axios';
import { app } from '@/main';

axios.interceptors.request.use(async config => {
    config.baseURL = process.env.VUE_APP_API_BASE_URL;

    const accessToken = await app.$auth.getTokenSilently();
    config.headers.Authorization = `Bearer ${accessToken}`;

    return config;
});

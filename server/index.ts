import { USER_SESSION_KEY } from '@/utils/constants';
import { objectCleaner } from '@/utils/functions';
import { getCookie, setCookie, deleteCookie, hasCookie } from '@/utils/storage';
import axios from 'axios';

const token = getCookie(USER_SESSION_KEY);

const server = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL_API,
  headers: { 'Content-type': 'application/json' },
});

server.interceptors.request.use(
  (config) => {
    config.headers = objectCleaner({
      Authorization: token ? `Bearer ${token}` : undefined,
      Accept: 'application/json',
    });

    return config;
  },
  (error) => Promise.reject(error)
);

server.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default server;

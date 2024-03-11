import axios from 'axios';
import {mainContext} from '../../App';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const BASE_URL = 'http://localhost:3000';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: 'application/json',
    'Cache-Control': 'no-cache',
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(async config => {
  const accessToken = await AsyncStorage.getItem('TOKEN');
  config.headers.Authorization = 'Bearer ' + accessToken;
  return config;
});

// setInterceptor(api);

export default api;

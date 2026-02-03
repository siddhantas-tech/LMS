import axiosInstance from './axios';

export const login = (data: any) => axiosInstance.post('/auth/login', data);
export const signup = (data: any) => axiosInstance.post('/auth/signup', data);
export const getMe = () => axiosInstance.get('/auth/me');

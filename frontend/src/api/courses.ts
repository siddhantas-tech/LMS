import axiosInstance from './axios';

export const getCourses = () => axiosInstance.get('/courses');
export const getCourseById = (id: string) => axiosInstance.get(`/courses/${id}`);

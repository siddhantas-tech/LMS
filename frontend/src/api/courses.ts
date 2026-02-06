import api from "./axios";

export const getCourses = () => api.get("/courses");

export const getCourseById = (id) =>
  api.get(`/courses/${id}`);

export const getCourseDetails = (id) =>
  api.get(`/courses/${id}/details`);

export const createCourse = (data) =>
  api.post("/courses", data);

export const deleteCourse = (id) =>
  api.delete(`/courses/${id}`);


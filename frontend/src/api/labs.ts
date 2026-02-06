import api from "./axios";

export const getLabs = () => api.get("/labs");

export const getLabById = (id) =>
  api.get(`/labs/${id}`);

export const getLabsForCourse = (courseId) =>
  api.get(`/labs/courses/${courseId}/labs`);

export const createLab = (data) =>
  api.post("/labs", data);

export const assignLabToCourse = (courseId, data) =>
  api.post(`/labs/courses/${courseId}/labs`, data);

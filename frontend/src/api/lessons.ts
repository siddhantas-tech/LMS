import api from "./axios";

export const getLessonsByCourse = (courseId) =>
  api.get(`/lessons/course/${courseId}`);

export const markLessonComplete = (lessonId) =>
  api.post(`/lessons/${lessonId}/complete`);

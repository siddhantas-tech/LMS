import api from "./axios";

export const getLessonsByCourse = (courseId: string) =>
  api.get(`/lessons/course/${courseId}`);

export const markLessonComplete = (lessonId: string) =>
  api.post(`/lessons/${lessonId}/complete`);

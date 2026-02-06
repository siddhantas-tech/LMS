import api from "./axios";

// User
export const getQuizByTopic = (topicId: string) =>
  api.get(`/quiz/topic/${topicId}`);

export const submitQuiz = (payload: any) =>
  api.post("/quiz/submit", payload);

export const getMyAttempts = () =>
  api.get("/quiz/my-attempts");

// Admin
export const getQuizQuestions = (params: any) =>
  api.get("/admin/quiz", { params });

export const createQuizQuestion = (data: any) =>
  api.post("/admin/quiz", data);

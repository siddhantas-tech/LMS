import api from "./axios";

// User
export const getQuizByTopic = (topicId) =>
  api.get(`/quiz/topic/${topicId}`);

export const submitQuiz = (payload) =>
  api.post("/quiz/submit", payload);

export const getMyAttempts = () =>
  api.get("/quiz/my-attempts");

// Admin
export const getQuizQuestions = (params) =>
  api.get("/admin/quiz", { params });

export const createQuizQuestion = (data) =>
  api.post("/admin/quiz", data);

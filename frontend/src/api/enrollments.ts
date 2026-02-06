import api from "./axios";

export const enrollCourse = (courseId) =>
  api.post("/enrollments", { courseId });

export const getMyEnrollments = () =>
  api.get("/enrollments/me");

import api from "./axios";

export const generateDevToken = (role) =>
  api.post("/dev/generate-token", { role });


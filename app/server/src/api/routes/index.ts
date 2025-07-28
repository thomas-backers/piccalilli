import authRouter from "@/api/routes/auth/router";
import type { Express } from "express";

export const useRoutes = (api: Express): Express => {
  api.use("/auth", authRouter);
  return api;
};

import { useRoutes } from "@/api/routes";
import express, { type Express } from "express";

const api: Express = express();
useRoutes(api);

export default api;

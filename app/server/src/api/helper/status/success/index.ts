import { success } from "@/api/helper";
import type { Response } from "express";

export const ok = <Payload extends object>(
  response: Response,
  message: string,
  payload: Payload
): void => {
  success(response, 200, message, payload);
};

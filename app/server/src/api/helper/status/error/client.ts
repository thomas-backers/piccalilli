import { failure } from "@/api/helper";
import type { Response } from "express";
import { Errors } from "shared/types";

export const badRequest = (
  response: Response,
  message: string,
  errors: Errors
): void => {
  failure(response, 400, errors, message);
};

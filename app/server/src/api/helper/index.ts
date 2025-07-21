import type { Response } from "express";
import type { Answer, Errors } from "shared/types";

export const success = <Payload extends object>(
  response: Response,
  code: number,
  message: string,
  payload: Payload
): void => {
  response.status(code).json({
    errors: {},
    message,
    payload,
  });
};

export const failure = (
  response: Response,
  code: number,
  errors: Errors,
  message: string
): void => {
  response.status(code).json({
    errors,
    message,
    payload: {},
  });
};

import { failure } from "@/api/helper";
import type { Response } from "express";

export const internalServerError = (response: Response): void => {
  failure(
    response,
    500,
    { global: ["The server failed to process the request"] },
    "Something went wrong"
  );
};

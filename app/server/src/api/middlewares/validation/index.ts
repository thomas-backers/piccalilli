import { badRequest } from "@/api/helper/status/error/client";
import type { NextFunction, Request, Response } from "express";
import z, { validateAsync } from "shared/validation";

export const bodyValidation = <ValidData>(schema: z.ZodType<ValidData>) => {
  return async (
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> => {
    const body: unknown = request.body;
    const { success, data, errors } = await validateAsync(schema, body);
    if (!success) {
      return badRequest(response, "", errors);
    }
    request.body = data;
    next();
  };
};

import type { Errors } from "../types";
import * as z from "zod";

export interface ValidationSuccess<Data> {
  success: true;
  data: Data;
  errors?: undefined;
}

export interface ValidationFailure {
  success: false;
  data?: undefined;
  errors: Errors;
}

export const validate = async <ValidData>(
  schema: z.ZodType<ValidData>,
  data: unknown
): Promise<ValidationSuccess<ValidData> | ValidationFailure> => {
  const {
    success,
    data: parsedData,
    error,
  } = await schema.safeParseAsync(data);
  if (!success) {
    const errors: Errors = {};
    for (const { path, message } of error.issues) {
      const field = path[0]?.toString() ?? "schema";
      errors[field] ??= [];
      errors[field].push(message);
    }
    return { success, errors };
  }
  return { success, data: parsedData };
};

export default z;

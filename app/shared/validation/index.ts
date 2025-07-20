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

const formatValidationResult = <ValidData>(
  result: z.ZodSafeParseResult<ValidData>
): ValidationSuccess<ValidData> | ValidationFailure => {
  const { success, data, error } = result;
  if (!success) {
    const errors: Errors = {};
    for (const { path, message } of error.issues) {
      const field = path[0]?.toString() ?? "schema";
      errors[field] ??= [];
      errors[field].push(message);
    }
    return { success, errors };
  }
  return { success, data };
};

export const validateSync = <ValidData>(
  schema: z.ZodType<ValidData>,
  data: unknown
): ValidationSuccess<ValidData> | ValidationFailure => {
  return formatValidationResult(schema.safeParse(data));
};

export const validateAsync = async <ValidData>(
  schema: z.ZodType<ValidData>,
  data: unknown
): Promise<ValidationSuccess<ValidData> | ValidationFailure> => {
  return formatValidationResult(await schema.safeParseAsync(data));
};

export default z;

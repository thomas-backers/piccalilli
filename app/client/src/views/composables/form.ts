import type { Errors } from "shared/types";
import z, { validateAsync, validateSync } from "shared/validation";
import { ref } from "vue";

export const useForm = <Schema extends z.ZodObject>(
  defaultForm: z.infer<Schema>,
  schema: Schema
) => {
  const form = ref<z.infer<Schema>>(defaultForm);
  const errors = ref<Errors>({});
  const validating = ref<boolean>(false);

  const validateField = (field: string): void => {
    if (!(field in form.value)) {
      console.warn(`Key "${field}" does not exist in form`);
      return;
    }
    const fieldSchema = schema.pick({ [field]: true });
    const { success, errors: validationErrors } = validateSync(
      fieldSchema,
      form.value
    );
    if (!success) {
      errors.value[field] = validationErrors[field];
      return;
    }
    delete errors.value[field];
  };

  const validateForm = async (): Promise<boolean> => {
    validating.value = true;
    const { success, errors: validationErrors } = await validateAsync(
      schema,
      form.value
    );
    validating.value = false;
    if (!success) {
      errors.value = validationErrors;
    }
    return success;
  };

  return { form, errors, validating, validateField, validateForm };
};

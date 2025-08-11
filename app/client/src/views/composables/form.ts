import type { Errors } from "shared/types";
import z, { validateAsync, validateSync } from "shared/validation";
import { ref } from "vue";

export const useForm = <Schema extends z.ZodObject>(
  defaultForm: z.infer<Schema>,
  schema: Schema,
  submitAction: (form: z.infer<Schema>) => Promise<Errors>
) => {
  const form = ref<z.infer<Schema>>(defaultForm);
  const errors = ref<Errors>({});
  const validating = ref<boolean>(false);

  const validateField = (field: string): boolean => {
    if (!(field in form.value)) {
      console.warn(`Key "${field}" does not exist in form`);
      return false;
    }
    const fieldSchema = schema.pick({ [field]: true });
    const { success, errors: validationErrors } = validateSync(
      fieldSchema,
      form.value
    );
    if (!success) {
      errors.value[field] = validationErrors[field];
      return false;
    }
    delete errors.value[field];
    return true;
  };

  const validateForm = async (): Promise<boolean> => {
    validating.value = true;
    const { success, errors: validationErrors } = await validateAsync(
      schema,
      form
    );
    validating.value = false;
    if (!success) {
      errors.value = validationErrors;
    }
    return success;
  };

  const submitForm = async (): Promise<void> => {
    const success: boolean = await validateForm();
    if (!success) {
      return;
    }
    errors.value = await submitAction(form.value);
  };

  return { form, errors, validating, validateField, validateForm, submitForm };
};

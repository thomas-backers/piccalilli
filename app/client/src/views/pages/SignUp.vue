<script setup lang="ts">
import Input from "@/views/components/Input.vue";
import { useUserStore, type SignUpForm } from "@/modules/store/user";
import { storeToRefs } from "pinia";
import type { Errors } from "shared/types";
import { validateAsync, validateSync } from "shared/validation";
import { signUpFormSchema } from "shared/validation/schemas/sign-up";
import { reactive, ref } from "vue";

const userStore = useUserStore();
const { loading } = storeToRefs(userStore);
const { signUp } = userStore;

const form = reactive<SignUpForm>({
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
});
const validating = ref<boolean>(false);
const errors = ref<Errors>({});

const onSubmit = async (): Promise<void> => {
  validating.value = true;
  const {
    success,
    data,
    errors: validationErrors,
  } = await validateAsync(signUpFormSchema, form);
  validating.value = false;
  if (!success) {
    errors.value = validationErrors;
    return;
  }
  errors.value = await signUp(data);
};

const onInput = (name: string): void => {
  const fieldSchema = signUpFormSchema.pick({ [name]: true });
  const { success, errors: validationErrors } = validateSync(fieldSchema, form);
  if (!success) {
    errors.value[name] = validationErrors[name];
    return;
  }
  delete errors.value[name];
};
</script>

<template>
  <form @submit.prevent="onSubmit">
    <Input
      v-model="form.username"
      :errors="errors.username"
      label="Username:"
      name="username"
      placeholder="Type your username"
      type="text"
      @input="onInput"
    />
    <button :disabled="loading || validating" type="submit">sign up</button>
  </form>
</template>

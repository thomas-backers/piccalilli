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
  if (!(name in form)) {
    console.warn(`Key "${name}" does not exist in form`);
    return;
  }
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
    <Input
      v-model="form.email"
      :errors="errors.email"
      label="Email:"
      name="email"
      placeholder="Type your email"
      type="email"
      @input="onInput"
    />
    <Input
      v-model="form.password"
      :errors="errors.password"
      label="Password:"
      name="password"
      placeholder="Type your password"
      type="password"
      @input="onInput"
    />
    <Input
      v-model="form.confirmPassword"
      :errors="errors.confirmPassword"
      label="Password confirmation:"
      name="confirmPassword"
      placeholder="Confirm your password"
      type="password"
      @input="onInput"
    />
    <button :disabled="loading || validating" type="submit">sign up</button>
    <ul v-if="errors.global">
      <li v-for="(error, i) of errors.global" :key="i">
        {{ error }}
      </li>
    </ul>
  </form>
</template>

<script setup lang="ts">
import { useUserStore, type SignUpForm } from "@/modules/store/user";
import { storeToRefs } from "pinia";
import type { Errors } from "shared/types";
import { validate } from "shared/validation";
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
  } = await validate(signUpFormSchema, form);
  validating.value = false;
  if (!success) {
    errors.value = validationErrors;
    return;
  }
  errors.value = await signUp(data);
};
</script>

<template>
  <form @submit.prevent="onSubmit">
    <label for="username">
      <input v-model="form.username" id="username" type="text" />
      <ul v-if="errors.username">
        <li v-for="(error, i) in errors.username" :key="i">
          {{ error }}
        </li>
      </ul>
    </label>
    <button :disabled="loading || validating" type="submit">sign up</button>
  </form>
</template>

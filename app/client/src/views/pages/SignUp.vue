<script setup lang="ts">
import { useUserStore } from "@/modules/store/user";
import Form from "@/views/components/Form.vue";
import Input from "@/views/components/Input.vue";
import { useForm } from "@/views/composables/form";
import { storeToRefs } from "pinia";
import { signUpFormSchema } from "shared/validation/schemas/sign-up";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const userStore = useUserStore();
const { loading } = storeToRefs(userStore);
const { signUp } = userStore;

const { form, errors, validating, validateField, validateForm } = useForm(
  {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  },
  signUpFormSchema
);

const onSubmit = async (): Promise<void> => {
  const success: boolean = await validateForm();
  if (!success) {
    return;
  }
  errors.value = await signUp(form.value);
};

const onInput = (name: string): void => {
  validateField(name);
};
</script>

<template>
  <Form @submit="onSubmit">
    <template #inputs>
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
    </template>
    <template #actions>
      <button :disabled="loading || validating" type="submit">sign up</button>
    </template>
    <template #redirections>
      <a href="/sign-in">I already have an account</a>
    </template>
    <ul v-if="errors.global">
      <li v-for="(error, i) of errors.global" :key="i">
        {{ error }}
      </li>
    </ul>
  </Form>
</template>

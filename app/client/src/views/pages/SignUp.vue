<script setup lang="ts">
import { useUserStore } from "@/modules/store/user";
import Button from "@/views/components/Button.vue";
import Form from "@/views/components/Form.vue";
import Input from "@/views/components/Input.vue";
import { useForm } from "@/views/composables/form";
import { storeToRefs } from "pinia";
import { signUpFormSchema } from "shared/validation/schemas/sign-up";
import { useRouter } from "vue-router";

const userStore = useUserStore();
const { loading, user } = storeToRefs(userStore);
const { signUp } = userStore;

const router = useRouter();

const { form, errors, validating, validateField, submitForm } = useForm(
  {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  },
  signUpFormSchema,
  signUp
);

const onSubmit = async (): Promise<void> => {
  await submitForm();
  if (user.value) {
    await router.push({ name: "Home" });
  }
};

const onInput = (name: string): void => {
  validateField(name);
};
</script>

<template>
  <Form :errors="errors.global" @submit="onSubmit">
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
      <Button :disabled="loading || validating" type="submit">sign up</Button>
    </template>
    <template #redirections>
      <RouterLink :to="{ name: 'SignIn' }">
        I already have an account
      </RouterLink>
    </template>
  </Form>
</template>

<script setup lang="ts">
import { useUserStore } from "@/modules/store/user";
import Button from "@/views/components/Button.vue";
import Form from "@/views/components/Form.vue";
import Input from "@/views/components/Input.vue";
import { useForm } from "@/views/composables/form";
import { storeToRefs } from "pinia";
import { signInFormSchema } from "shared/validation/schemas/sign-in";

const userStore = useUserStore();
const { loading } = storeToRefs(userStore);
const { signIn } = userStore;

const { form, errors, validating, validateField, submitForm } = useForm(
  {
    email: "",
    password: "",
  },
  signInFormSchema,
  signIn
);

const onSubmit = async (): Promise<void> => {
  await submitForm();
};

const onInput = (name: string): void => {
  validateField(name);
};
</script>

<template>
  <Form :errors="errors.global" @submit="onSubmit">
    <template #inputs>
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
    </template>
    <template #actions>
      <Button :disabled="loading || validating" type="submit">sign in</Button>
    </template>
    <template #redirections>
      <RouterLink :to="{ name: 'SignUp' }">
        I want to create an account
      </RouterLink>
    </template>
  </Form>
</template>

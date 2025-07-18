<script setup lang="ts">
import type { Errors } from "../../modules/api";
import { useUserStore, type SignUpForm } from "../../modules/store/user";
import { reactive, ref } from "vue";

const { loading, signUp } = useUserStore();

const form = reactive<SignUpForm>({
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
});

const errors = ref<Errors>({});

const onSubmit = async (): Promise<void> => {
  errors.value = await signUp(form);
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
    <button :disabled="loading" type="submit">sign up</button>
  </form>
</template>

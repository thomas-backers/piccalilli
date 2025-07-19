import { post } from "@/modules/api";
import { defineStore } from "pinia";
import type { Answer, Errors } from "shared/types";
import { ref } from "vue";

export interface SignUpForm {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface SignUpPayload {}

export interface User {
  name: string;
}

export const useUserStore = defineStore("user", () => {
  const loading = ref<boolean>(false);
  const user = ref<User | undefined>();

  const signUp = async (data: SignUpForm): Promise<Errors> => {
    loading.value = true;
    const { errors, message }: Answer<SignUpPayload> = await post(
      "/auth/sign-up",
      data
    );
    console.log(message);
    loading.value = false;
    return errors;
  };

  return { loading, user, signUp };
});

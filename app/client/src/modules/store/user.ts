import { post } from "@/modules/api";
import { defineStore } from "pinia";
import type { Answer, Errors } from "shared/types";
import type { SignUpPayload } from "shared/types/payloads/sign-up";
import type { SignInForm } from "shared/validation/schemas/sign-in";
import type { SignUpForm } from "shared/validation/schemas/sign-up";
import { ref } from "vue";

export interface User {
  username: string;
  email: string;
  verified: boolean;
}

export const useUserStore = defineStore("user", () => {
  const loading = ref<boolean>(false);
  const user = ref<User | undefined>();

  const signIn = async (form: SignInForm): Promise<Errors> => {
    loading.value = true;
    const { errors, message }: Answer<object> = await post(
      "/auth/sign-in",
      form
    );
    console.log(message);
    loading.value = false;
    return errors;
  };

  const signUp = async (form: SignUpForm): Promise<Errors> => {
    loading.value = true;
    const { errors, message, payload }: Answer<SignUpPayload> = await post(
      "/auth/sign-up",
      form
    );
    console.log(message);
    const { username, email, verified } = payload;
    user.value = {
      username,
      email,
      verified,
    };
    loading.value = false;
    return errors;
  };

  return { loading, user, signIn, signUp };
});

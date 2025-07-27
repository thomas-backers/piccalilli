import z from "..";
import { email, password } from "./fields";

export const signInFormSchema = z.object({
  email,
  password,
});

export type SignInForm = z.infer<typeof signInFormSchema>;

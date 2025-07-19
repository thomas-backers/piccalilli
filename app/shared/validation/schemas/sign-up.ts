import z from "..";
import { username, email, password } from "./fields";

export const signUpFormSchema = z
  .object({
    username,
    email,
    password,
    confirmPassword: password,
  })
  .refine(
    ({ password, confirmPassword }) => {
      return password === confirmPassword;
    },
    {
      path: ["confirmPassword"],
      message: "Must be identical to password",
    }
  );

export type SignUpForm = z.infer<typeof signUpFormSchema>;

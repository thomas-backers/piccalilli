import z from "../..";

export const username = z.string("Must be a string").min(3).max(20);
export const email = z.email().max(320);
export const password = z
  .string("Must be a string")
  .min(12)
  .refine((value) => {
    return new TextEncoder().encode(value).length <= 72;
  }, "Must be shorter");

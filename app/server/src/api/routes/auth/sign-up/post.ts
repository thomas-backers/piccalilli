import { ok } from "@/api/helper/status/success";
import type { User } from "@/modules/database/schemas/users";
import { createUser } from "@/modules/database/tables/users";
import { sendVerificationMail } from "@/modules/email";
import bcrypt from "bcryptjs";
import type { Request, Response } from "express";
import type { SignUpPayload } from "shared/types/payloads/sign-up";
import { SignUpForm } from "shared/validation/schemas/sign-up";

const post = async (request: Request, response: Response): Promise<void> => {
  const { username, email, password }: SignUpForm = request.body;
  const passwordHash: string = await bcrypt.hash(password, 12);
  const user: User = await createUser(username, email, passwordHash);
  await sendVerificationMail(user.email, user.publicId);
  return ok<SignUpPayload>(response, "", {
    username: user.username,
    email: user.email,
    verified: user.verifiedAt !== null,
  });
};

export default post;

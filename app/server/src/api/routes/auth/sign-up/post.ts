import { ok } from "@/api/helper/status/success";
import bcrypt from "bcryptjs";
import type { Request, Response } from "express";
import { SignUpForm } from "shared/validation/schemas/sign-up";

const post = async (request: Request, response: Response): Promise<void> => {
  const { username, password }: SignUpForm = request.body;
  const passwordHash: string = await bcrypt.hash(password, 12);
  return ok(response, "", {
    username,
    verified: false,
  });
};

export default post;

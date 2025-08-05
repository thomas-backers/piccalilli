import { nanoid } from "nanoid";

export const generatePublicId = (): string => {
  return nanoid();
};

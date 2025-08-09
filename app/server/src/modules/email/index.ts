import { createTransport, type SentMessageInfo } from "nodemailer";

const mailer = createTransport();

export const sendVerificationMail = async (
  to: string,
  publicId: string
): Promise<SentMessageInfo> => {
  return await mailer.sendMail({
    from: "",
    to,
    subject: "Email verification",
    text: `${publicId}`,
  });
};

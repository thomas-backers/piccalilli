import { bodyValidation } from "@/api/middlewares/validation";
import signUp from "@/api/routes/auth/sign-up/post";
import { Router } from "express";
import { signUpFormSchema } from "shared/validation/schemas/sign-up";

const router: Router = Router();

router.post("/sign-up", bodyValidation(signUpFormSchema), signUp);

export default router;

import signUp from "@/api/routes/auth/sign-up/post";
import { Router } from "express";

const router: Router = Router();

router.post("/sign-up", signUp);

export default router;

import { Router } from "express";
import validate from "../../middleware/validation.middleware";
import { loginSchema } from "../../schemas/auth/login.schema";
import loginUserController from "../../controllers/auth/login.controller";

const router = Router();

router.post("/", validate(loginSchema as any), loginUserController);

export default router;

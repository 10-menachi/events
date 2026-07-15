import { Router } from "express";
import registerUserController from "../../controllers/auth/register.controller";
import validate from "../../middleware/validation.middleware";
import registrationSchema from "../../schemas/auth/registration.schema";

const router = Router();

router.post("/", validate(registrationSchema as any), registerUserController);

export default router;

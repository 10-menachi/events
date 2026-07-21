import { Router } from "express";
import logoutAllUserController from "../../controllers/auth/logoutAll.controller";
import authMiddleware from "../../middleware/auth.middleware";

const router = Router();

router.post("/", authMiddleware, logoutAllUserController);

export default router;

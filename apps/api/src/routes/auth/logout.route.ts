import { Router } from "express";
import authMiddleware from "../../middleware/auth.middleware";
import logoutUserController from "../../controllers/auth/logout.controller";
import logoutAllUserController from "../../controllers/auth/logoutAll.controller";

const router = Router();

router.post("/", authMiddleware, logoutUserController);
router.post("/all", authMiddleware, logoutAllUserController);

export default router;

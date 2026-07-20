import { Router } from "express";
import meController from "../../controllers/user/me.controller";
import authMiddleware from "../../middleware/auth.middleware";

const router = Router();

router.get("/", authMiddleware, meController);

export default router;

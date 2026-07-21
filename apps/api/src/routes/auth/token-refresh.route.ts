import { Router } from "express";
import refreshAccessTokenController from "../../controllers/auth/token-refresh.controller";

const router = Router();

router.post("/", refreshAccessTokenController);

export default router;

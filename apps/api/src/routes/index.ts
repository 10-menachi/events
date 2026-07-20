import { Router } from "express";
import healthRoute from "./health.route";
import rootRoute from "./root.route";
import authRoutes from "./auth";
import userRoutes from "./user";

const router = Router();

router.use(healthRoute);
router.use(rootRoute);
router.use("/api/auth", authRoutes);
router.use("/api/user", userRoutes);

export default router;

import { Router } from "express";
import healthRoute from "./health.route";
import rootRoute from "./root.route";

const router = Router();

router.use(healthRoute);
router.use(rootRoute);

export default router;

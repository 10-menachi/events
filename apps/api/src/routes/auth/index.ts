import { Router } from "express";
import registerRoute from "./register.route";
import loginRoute from "./login.route";
import logoutRoute from "./logout.route";
import logoutAllRoute from "./logout-all.route";

const router = Router();

router.use("/register", registerRoute);
router.use("/login", loginRoute);
router.use("/logout", logoutRoute);
router.use("/logout-all", logoutAllRoute);

export default router;

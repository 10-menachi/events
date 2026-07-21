import { Router } from "express";
import registerRoute from "./register.route";
import loginRoute from "./login.route";
import logoutRoute from "./logout.route";
import logoutAllRoute from "./logout-all.route";
import tokenRefreshRoute from "./token-refresh.route";

const router = Router();

router.use("/register", registerRoute);
router.use("/login", loginRoute);
router.use("/logout", logoutRoute);
router.use("/logout-all", logoutAllRoute);
router.use("/token-refresh", tokenRefreshRoute);

export default router;

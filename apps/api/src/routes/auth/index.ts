import { Router } from "express";
import registerRoute from "./register.route";
import logoutRoute from "./logout.route";
import loginRoute from "./login.route";

const router = Router();

router.use("/register", registerRoute);
router.use("/login", loginRoute);
router.use("/logout", logoutRoute);

export default router;

import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  req.log.info("Root Route");

  res.status(200).json({
    route: "ROOT",
    timeStamp: new Date().toISOString(),
  });
});

export default router;

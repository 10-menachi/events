import { Router } from "express";

const router = Router();

router.get("/health", (req, res) => {
  req.log.info("Health Check");

  res.status(200).json({
    status: "OK",
    timeStamp: new Date().toISOString(),
  });
});

export default router;

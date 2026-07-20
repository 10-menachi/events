import type { NextFunction, Request, Response } from "express";

export default function meController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  return res.status(200).json({
    rada: "safi",
  });
}

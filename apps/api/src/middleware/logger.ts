import type { Request, Response, NextFunction } from "express";
import logger from "../lib/logger";

export function requestLogger(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  req.log = logger.child({
    requestId: req.requestId,
  });

  next();
}

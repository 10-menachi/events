import type { Request, Response, NextFunction } from "express";
import logger from "../lib/logger";
import AppError from "../errors/app.error";

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  logger.error(err);

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      code: err.code,
      message: err.message,
    });
  }

  return res.status(500).json({
    code: "INTERNAL_SERVER_ERROR",
    message: "An unexpected error occurred",
  });
}

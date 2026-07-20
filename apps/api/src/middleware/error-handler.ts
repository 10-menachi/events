import type { Request, Response, NextFunction } from "express";
import logger from "../lib/logger";
import AppError from "../errors/app.error";
import { ZodError } from "zod";
import { JWTExpired } from "jose/errors";

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

  if (err instanceof ZodError) {
    return res.status(400).json({
      code: "VALIDATION_ERROR",
      message: "Request validation failed",
      errors: err.issues.map((issue) => ({
        path: issue.path.join("."),
        message: issue.message,
      })),
    });
  }

  if (err instanceof JWTExpired) {
    return res.status(401).json({
      code: "TOKEN_EXPIRED",
      message: "Your session has expired",
    });
  }

  return res.status(500).json({
    code: "INTERNAL_SERVER_ERROR",
    message: "An unexpected error occurred",
  });
}

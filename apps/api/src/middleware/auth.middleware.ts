import type { NextFunction, Request, Response } from "express";
import UnauthorizedError from "../errors/unauthorized.error";

export default async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authorization = req.headers.authorization;

  if (!authorization) {
    throw new UnauthorizedError(
      "RESOURCE_BLOCKED",
      "You are unauthorized to access this resource",
    );
  }

  const [type, token] = authorization.split(" ");

  if (type !== "Bearer" || !token) {
    throw new UnauthorizedError(
      "RESOURCE_BLOCKED",
      "You are unauthorized to access this resource",
    );
  }

  next();
}

import type { NextFunction, Request, Response } from "express";
import UnauthorizedError from "../errors/unauthorized.error";
import verifyAccessToken from "../services/auth/access_token/verify.service";
import logger from "../lib/logger";
import prisma from "../lib/prisma";

export default async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
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

    const { payload } = await verifyAccessToken(token);

    if (!payload) {
      throw new UnauthorizedError(
        "RESOURCE_BLOCKED",
        "You are unauthorized to access this resource",
      );
    }

    if (payload.type !== "access-token" || !payload.sub || !payload.sid) {
      throw new UnauthorizedError(
        "INVALID_TOKEN",
        "Invalid authentication token",
      );
    }

    const userId = payload.sub;
    const sessionId = payload.sid;

    const session = await prisma.session.findUnique({
      where: {
        id: sessionId as string,
        userId: userId,
        revokedAt: null,
        expiresAt: {
          gt: new Date(),
        },
      },
    });

    if (!session) {
      throw new UnauthorizedError(
        "RESOURCE_BLOCKED",
        "You are unauthorized to access this resource",
      );
    }

    next();
  } catch (error) {
    next(error);
  }
}

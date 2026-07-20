import type { NextFunction, Request, Response } from "express";
import logger from "../../lib/logger";
import prisma from "../../lib/prisma";
import UnauthorizedError from "../../errors/unauthorized.error";
import NotFoundError from "../../errors/not-found.error";

export default async function meController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const user = await prisma.user.findUnique({
    where: {
      id: req.auth.userId,
    },
  });

  if (!user) {
    throw new NotFoundError();
  }

  const emailIdentity = await prisma.emailIdentity.findFirst({
    where: {
      userId: user.id as string,
    },
  });

  if (!emailIdentity) {
    throw new NotFoundError();
  }

  return res.status(200).json({
    id: user.id,
    fullName: user.fullName,
    email: emailIdentity.email,
    userName: user.username,
    avatarUrl: user.avatarUrl,
  });
}

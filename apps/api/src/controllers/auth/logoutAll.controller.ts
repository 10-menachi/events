import type { NextFunction, Request, Response } from "express";
import revokeAllSessionsService from "../../services/auth/session/revoke-all.service";

export default async function logoutAllUserController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const userId = req.auth.userId;

    await revokeAllSessionsService(userId);

    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

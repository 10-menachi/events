import type { NextFunction, Request, Response } from "express";
import revokeSessionService from "../../services/auth/session/revoke.service";

export default async function logoutUserController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const userId = req.auth.userId;
    const sessionId = req.auth.sessionId;

    await revokeSessionService(userId, sessionId);

    return res.status(204).send();
  } catch (error) {
    next(error);
  }
}

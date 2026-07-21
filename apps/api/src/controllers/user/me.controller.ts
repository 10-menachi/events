import type { NextFunction, Request, Response } from "express";
import meService from "../../services/user/me.service";

export default async function meController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { user, emailIdentity } = await meService(req.auth.userId);

  return res.status(200).json({
    id: user.id,
    fullName: user.fullName,
    email: emailIdentity.email,
    userName: user.username,
    avatarUrl: user.avatarUrl,
  });
}

import type { NextFunction, Request, Response } from "express";
import loginUserService from "../../services/auth/login.service";

export default async function loginUserController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { user, emailIdentity, accessToken, refreshTokenHash } =
      await loginUserService(req.body);
    return res.status(200).json({
      id: user.id,
      fullName: user.fullName,
      email: emailIdentity.email,
      accessToken,
      refreshToken: refreshTokenHash,
    });
  } catch (error) {
    next(error);
  }
}

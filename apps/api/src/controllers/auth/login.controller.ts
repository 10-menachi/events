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

    res.cookie("refreshToken", refreshTokenHash, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    return res.status(200).json({
      id: user.id,
      fullName: user.fullName,
      email: emailIdentity.email,
      accessToken,
    });
  } catch (error) {
    next(error);
  }
}

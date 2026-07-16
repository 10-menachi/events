import type { NextFunction, Request, Response } from "express";
import loginUserService from "../../services/auth/login.service";

export default async function loginUserController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { user, emailIdentity } = await loginUserService(req.body);
    return res.status(200).json({
      id: user.id,
      fullName: user.fullName,
      email: emailIdentity.email,
    });
  } catch (error) {
    next(error);
  }
}

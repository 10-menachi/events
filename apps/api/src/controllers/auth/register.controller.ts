import type { NextFunction, Request, Response } from "express";
import registerUserService from "../../services/auth/register.service";

export default async function registerUserController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { user, emailIdentity } = await registerUserService(req.body);
    const response = {
      id: user.id,
      fullName: user.fullName,
      email: emailIdentity.email,
    };
    return res.status(201).json(response);
  } catch (error) {
    next(error);
  }
}

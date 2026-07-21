import type { NextFunction, Request, Response } from "express";
import UnauthorizedError from "../../errors/unauthorized.error";
import refreshTokenService from "../../services/auth/access_token/refresh.service";
import generateAccessTokenService from "../../services/auth/access_token/generate.service";
import rotateRefreshTokenService from "../../services/auth/refresh_token/rotate.service";

export default async function refreshAccessTokenController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      throw new UnauthorizedError();
    }

    const [id, secret] = refreshToken.split(".");

    if (!id || !secret) {
      throw new UnauthorizedError();
    }

    const { userId, sessionId } = await refreshTokenService(id, secret);

    const newRefreshToken = await rotateRefreshTokenService(
      sessionId,
      id,
      secret,
    );

    const accessToken = await generateAccessTokenService(userId, sessionId);

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/api",
    });

    res.cookie(
      "refreshToken",
      `${newRefreshToken.refreshTokenId}.${newRefreshToken.refreshToken}`,
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/api",
        maxAge: 1000 * 60 * 60 * 24 * 7,
      },
    );

    return res.status(200).json({
      accessToken,
    });
  } catch (error) {
    next(error);
  }
}

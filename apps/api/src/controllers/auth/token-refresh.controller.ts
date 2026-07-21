import type { NextFunction, Request, Response } from "express";
import refreshTokenService from "../../services/auth/access_token/refresh.service";
import UnauthorizedError from "../../errors/unauthorized.error";
import generateAccessTokenService from "../../services/auth/access_token/generate.service";
import logger from "../../lib/logger";
import rotateRefreshTokenService from "../../services/auth/refresh_token/rotate.service";

export default async function refreshAccessTokenController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const refreshToken = req.cookies.refreshToken;

    logger.info(`TUKUN: ${refreshToken}`);

    if (!refreshToken) {
      throw new UnauthorizedError();
    }

    const [id, secret] = refreshToken.split(".");

    const { userId, sessionId } = await refreshTokenService(id, secret);

    const accessToken = await generateAccessTokenService(userId, sessionId);

    const newRefreshToken = await rotateRefreshTokenService(
      sessionId,
      id,
      secret,
    );

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/api/auth",
    });

    res.cookie(
      "refreshToken",
      `${newRefreshToken.refreshTokenId}.${newRefreshToken.refreshToken}`,
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/api/auth",
        maxAge: 1000 * 60 * 60 * 24 * 7,
      },
    );

    return res.status(200).json({ accessToken });
  } catch (error) {
    next(error);
  }
}

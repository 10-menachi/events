import type { NextFunction, Request, Response } from "express";
import refreshTokenService from "../../services/auth/refresh_token/refresh.service";
import UnauthorizedError from "../../errors/unauthorized.error";
import generateAccessToken from "../../services/auth/access_token/generate.service";
import logger from "../../lib/logger";

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

    const accessToken = await generateAccessToken(userId, sessionId);

    return res.status(200).json({ accessToken });
  } catch (error) {
    next(error);
  }
}

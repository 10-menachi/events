import UnauthorizedError from "../../../errors/unauthorized.error";
import prisma from "../../../lib/prisma";
import { verifyPassword } from "../../../providers/auth/password.provider";
import { generateRefreshToken } from "./generate.service";

export default async function rotateRefreshTokenService(
  sessionId: string,
  refreshTokenId: string,
  secret: string,
) {
  const oldDbToken = await prisma.refreshToken.findUnique({
    where: {
      id: refreshTokenId,
      session: {
        id: sessionId,
      },
    },
  });

  if (!oldDbToken) {
    throw new UnauthorizedError();
  }

  const isSecretValid = await verifyPassword(secret, oldDbToken.tokenHash);

  if (!isSecretValid) {
    throw new UnauthorizedError();
  }

  await prisma.refreshToken.update({
    where: {
      id: refreshTokenId,
      session: {
        id: sessionId,
      },
    },
    data: {
      revokedAt: new Date(),
    },
  });

  const newDbToken = await generateRefreshToken(sessionId);

  return newDbToken;
}

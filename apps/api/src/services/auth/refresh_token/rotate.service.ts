import UnauthorizedError from "../../../errors/unauthorized.error";
import prisma from "../../../lib/prisma";
import { verifyPassword } from "../../../providers/auth/password.provider";
import { generateRefreshToken } from "./generate.service";

export default async function rotateRefreshTokenService(
  sessionId: string,
  refreshTokenId: string,
  secret: string,
) {
  return prisma.$transaction(async (tx) => {
    const oldDbToken = await tx.refreshToken.findUnique({
      where: {
        id: refreshTokenId,
      },
      include: {
        session: true,
      },
    });

    if (!oldDbToken) {
      throw new UnauthorizedError();
    }

    if (!oldDbToken.session || oldDbToken.session.id !== sessionId) {
      throw new UnauthorizedError();
    }

    if (oldDbToken.revokedAt) {
      throw new UnauthorizedError();
    }

    if (oldDbToken.expiresAt < new Date()) {
      throw new UnauthorizedError();
    }

    const isSecretValid = await verifyPassword(secret, oldDbToken.tokenHash);

    if (!isSecretValid) {
      throw new UnauthorizedError();
    }

    await tx.refreshToken.update({
      where: {
        id: refreshTokenId,
      },
      data: {
        revokedAt: new Date(),
      },
    });

    return generateRefreshToken(sessionId, tx);
  });
}

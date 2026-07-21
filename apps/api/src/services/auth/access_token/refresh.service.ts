import UnauthorizedError from "../../../errors/unauthorized.error";
import prisma from "../../../lib/prisma";
import { verifyPassword } from "../../../providers/auth/password.provider";

export default async function refreshTokenService(
  refreshTokenId: string,
  secret: string,
) {
  const token = await prisma.refreshToken.findUnique({
    where: {
      id: refreshTokenId,
    },
    include: {
      session: true,
    },
  });

  if (!token) {
    throw new UnauthorizedError();
  }

  if (token.revokedAt) {
    throw new UnauthorizedError();
  }

  if (token.expiresAt < new Date()) {
    throw new UnauthorizedError();
  }

  if (!token.session || token.session.revokedAt) {
    throw new UnauthorizedError();
  }

  const isValid = await verifyPassword(secret, token.tokenHash);

  if (!isValid) {
    throw new UnauthorizedError();
  }

  return {
    userId: token.session.userId,
    sessionId: token.sessionId,
  };
}

// We revoke both the session and the refresh token associated with it in a single transaction to ensure that the session and refresh token are always in sync. If we revoked the session and then failed to revoke the refresh token, the user would be able to use the refresh token to get a new access token, which would be a security issue.

import prisma from "../../../lib/prisma";

export default async function revokeSessionService(
  userId: string,
  sessionId: string,
) {
  return prisma.$transaction(async (tx) => {
    await tx.session.updateMany({
      where: {
        id: sessionId,
        userId,
        revokedAt: null,
      },
      data: {
        revokedAt: new Date(),
      },
    });

    await tx.refreshToken.updateMany({
      where: {
        sessionId,
        revokedAt: null,
      },
      data: {
        revokedAt: new Date(),
      },
    });
  });
}

import prisma from "../../../lib/prisma";

export default async function revokeAllSessionsService(userId: string) {
  const revokedAt = new Date();

  return prisma.$transaction(async (tx) => {
    await tx.session.updateMany({
      where: {
        userId,
        revokedAt: null,
      },
      data: {
        revokedAt,
      },
    });

    await tx.refreshToken.updateMany({
      where: {
        session: {
          userId,
        },
        revokedAt: null,
      },
      data: {
        revokedAt,
      },
    });
  });
}

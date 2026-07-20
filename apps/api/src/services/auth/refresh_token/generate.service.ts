import { randomBytes } from "crypto";
import prisma from "../../../lib/prisma";
import { env } from "../../../config";
import { hashPassword } from "../../../providers/auth/password.provider";
import { daysFromNow } from "../../../lib/utils/helpers";

export async function generateRefreshToken(sessionId: string) {
  const refreshToken = randomBytes(64).toString("hex");
  const refreshTokenHash = await hashPassword(refreshToken);

  await prisma.refreshToken.create({
    data: {
      sessionId,
      tokenHash: refreshTokenHash,
      expiresAt: daysFromNow(Number(env.refreshTokenExpiry)),
    },
  });

  return refreshToken;
}

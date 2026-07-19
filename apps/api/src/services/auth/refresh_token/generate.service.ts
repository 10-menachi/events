import { randomBytes } from "crypto";
import prisma from "../../../lib/prisma";
import { env } from "../../../config";
import { hashPassword } from "../../../providers/auth/password.provider";
import { daysFromNow } from "../../../lib/utils/helpers";

export async function generateRefreshToken(sessionId: string) {
  const tokenHash = randomBytes(64).toString("hex");
  const hashedTokenHash = await hashPassword(tokenHash);

  await prisma.refreshToken.create({
    data: {
      sessionId,
      tokenHash: hashedTokenHash,
      expiresAt: daysFromNow(Number(env.refreshTokenExpiry)),
    },
  });

  return tokenHash;
}

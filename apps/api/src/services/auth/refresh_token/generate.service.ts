import { randomBytes } from "crypto";
import prisma from "../../../lib/prisma";
import { env } from "../../../config";
import { hashPassword } from "../../../providers/auth/password.provider";
import { daysFromNow } from "../../../lib/utils/helpers";
import type { TransactionClient } from "../../../../generated/prisma/internal/prismaNamespace";

export async function generateRefreshToken(
  sessionId: string,
  tx?: TransactionClient,
) {
  const refreshToken = randomBytes(64).toString("hex");

  const refreshTokenHash = await hashPassword(refreshToken);

  const client = tx ?? prisma;

  const dbToken = await client.refreshToken.create({
    data: {
      sessionId,
      tokenHash: refreshTokenHash,
      expiresAt: daysFromNow(Number(env.refreshTokenExpiry)),
    },
  });

  return {
    refreshToken,
    refreshTokenId: dbToken.id,
  };
}

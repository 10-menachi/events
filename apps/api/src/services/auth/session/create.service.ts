import { env } from "../../../config";
import prisma from "../../../lib/prisma";
import { daysFromNow } from "../../../lib/utils/helpers";

export default async function createSessionService(userId: string) {
  return await prisma.session.create({
    data: {
      userId,
      expiresAt: daysFromNow(Number(env.sessionExpiry)),
    },
  });
}

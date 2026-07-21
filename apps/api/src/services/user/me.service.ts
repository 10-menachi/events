import NotFoundError from "../../errors/not-found.error";
import prisma from "../../lib/prisma";

export default async function meService(userId: string) {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new NotFoundError();
  }

  const emailIdentity = await prisma.emailIdentity.findFirst({
    where: {
      userId: user.id as string,
    },
  });

  if (!emailIdentity) {
    throw new NotFoundError();
  }

  return { user, emailIdentity };
}

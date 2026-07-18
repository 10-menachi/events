import prisma from "../../src/lib/prisma";

export async function resetDatabase() {
  await prisma.$transaction([
    prisma.session.deleteMany(),
    prisma.oTPVerification.deleteMany(),
    prisma.oAuthAccount.deleteMany(),
    prisma.phoneIdentity.deleteMany(),
    prisma.passwordCredential.deleteMany(),
    prisma.emailIdentity.deleteMany(),
    prisma.user.deleteMany(),
  ]);
}

import prisma from "../../src/lib/prisma";

export async function resetDatabase() {
  await prisma.user.deleteMany();
}

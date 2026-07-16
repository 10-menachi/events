import { InvalidCredentialsError } from "../../errors/auth.errors";
import prisma from "../../lib/prisma";
import { verifyPassword } from "../../providers/auth/password.provider";
import type { LoginInput } from "../../schemas/auth/login.schema";

export default async function loginUserService(input: LoginInput) {
  const existingEmailIdentity = await prisma.emailIdentity.findUnique({
    where: {
      email: input.email,
    },
  });

  if (!existingEmailIdentity) {
    throw new InvalidCredentialsError();
  }

  const passwordCredential = await prisma.passwordCredential.findUnique({
    where: {
      emailIdentityId: existingEmailIdentity.id,
    },
  });

  if (!passwordCredential) {
    throw new InvalidCredentialsError();
  }

  const isPasswordValid = await verifyPassword(
    input.password,
    passwordCredential.passwordHash,
  );

  if (!isPasswordValid) {
    throw new InvalidCredentialsError();
  }

  const user = await prisma.user.findUnique({
    where: {
      id: existingEmailIdentity.userId,
    },
  });

  if (!user) {
    throw new InvalidCredentialsError();
  }

  return { user, emailIdentity: existingEmailIdentity };
}

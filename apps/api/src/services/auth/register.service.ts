import ConflictError from "../../errors/conflict.error";
import prisma from "../../lib/prisma";
import { hashPassword } from "../../providers/auth/password.provider";
import type { RegistrationInput } from "../../validators/auth/registration.validator";

export default async function registerUserService(input: RegistrationInput) {
  const existingEmailIdentity = await prisma.emailIdentity.findUnique({
    where: {
      email: input.email,
    },
  });

  if (existingEmailIdentity) {
    throw new ConflictError("EMAIL_ALREADY_EXISTS", "Email already exists");
  }

  const hashedPassword = await hashPassword(input.password);

  return prisma.$transaction(async (tx) => {
    const user = await tx.user.create({
      data: {
        fullName: input.fullName,
      },
    });

    const emailIdentity = await tx.emailIdentity.create({
      data: {
        userId: user.id,
        email: input.email,
        isPrimary: true,
      },
    });

    await tx.passwordCredential.create({
      data: {
        emailIdentityId: emailIdentity.id,
        passwordHash: hashedPassword,
      },
    });

    return { user, emailIdentity };
  });
}

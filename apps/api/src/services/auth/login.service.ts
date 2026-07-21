import { InvalidCredentialsError } from "../../errors/auth.errors";
import prisma from "../../lib/prisma";
import { verifyPassword } from "../../providers/auth/password.provider";
import type { LoginInput } from "../../schemas/auth/login.schema";
import generateAccessTokenService from "./access_token/generate.service";
import { generateRefreshToken } from "./refresh_token/generate.service";
import createSessionService from "./session/create.service";

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

  const session = await createSessionService(user.id);

  const { refreshToken: refreshTokenHash, refreshTokenId } =
    await generateRefreshToken(session.id);

  const accessToken = await generateAccessTokenService(user.id, session.id);

  return {
    user,
    emailIdentity: existingEmailIdentity,
    refreshTokenHash,
    refreshTokenId,
    accessToken,
  };
}

import { SignJWT } from "jose";
import { env } from "../../../config";

export default async function generateAccessTokenService(
  userId: string,
  sessionId: string,
) {
  return await new SignJWT({ sid: sessionId, type: "access-token" })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setSubject(userId)
    .setIssuedAt()
    .setIssuer(env.appName)
    .setAudience(env.apiName)
    .setExpirationTime(env.accessTokenExpiry!)
    .sign(new TextEncoder().encode(env.jwtSecret!));
}

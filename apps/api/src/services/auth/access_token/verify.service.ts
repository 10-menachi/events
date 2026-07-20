import { jwtVerify } from "jose";
import { env } from "../../../config";

export default async function verifyAccessToken(token: string) {
  return await jwtVerify(token, new TextEncoder().encode(env.jwtSecret!), {
    issuer: env.appName,
    audience: env.apiName,
  });
}

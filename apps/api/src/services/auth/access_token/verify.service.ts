import { jwtDecrypt } from "jose";
import { env } from "../../../config";

export default async function verifyAccessToken(token: string) {
  return await jwtDecrypt(token, new TextEncoder().encode(env.jwtSecret!));
}

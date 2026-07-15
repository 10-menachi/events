import { hash, verify, argon2id } from "argon2";

export async function hashPassword(password: string) {
  return hash(password, {
    type: argon2id,
  });
}

export async function verifyPassword(password: string, hashedPassword: string) {
  return verify(hashedPassword, password);
}

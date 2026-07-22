import { execSync } from "node:child_process";

export default async function globalSetup() {
  console.log("Preparing test database...");

  execSync("bunx prisma generate", {
    stdio: "inherit",
  });

  execSync("bunx prisma migrate deploy", {
    stdio: "inherit",
  });

  console.log("Test database ready.");
}

import { resolve } from "node:path";
import { config as loadDotenv } from "dotenv";
import { defineConfig } from "vitest/config";

const testEnvPath = resolve(process.cwd(), ".env.test");
loadDotenv({ path: testEnvPath, override: true });

export default defineConfig({
  test: {
    environment: "node",
    globals: false,
    env: {
      NODE_ENV: "test",
      DATABASE_URL: process.env.DATABASE_URL ?? "",
    },
    globalSetup: "./tests/setup/global.ts",
    maxWorkers: 1,
  },
});

import "dotenv/config";

export const env = {
  appName: process.env.APP_NAME ?? "events",

  apiName: process.env.API_NAME ?? "events-api",

  nodeEnv: process.env.NODE_ENV ?? "development",

  port: Number(process.env.PORT ?? 3000),

  databaseUrl: process.env.DATABASE_URL ?? "",

  jwtSecret: process.env.JWT_SECRET,

  refreshTokenExpiry: process.env.REFRESH_TOKEN_EXPIRY,

  accessTokenExpiry: process.env.ACCESS_TOKEN_EXPIRY,

  sessionExpiry: process.env.SESSION_EXPIRY,
};

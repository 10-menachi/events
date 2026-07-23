import { beforeEach, describe, expect, it } from "vitest";
import request from "supertest";
import app from "../../../src/app";
import { resetDatabase } from "../../setup/database";
import prisma from "../../../src/lib/prisma";

const validRegistrationPayload = {
  fullName: "Wamalwa Christian Timbe",
  email: "timbe@example.com",
  password: "password123",
  passwordConfirmation: "password123",
};

beforeEach(async () => {
  await resetDatabase();
});

async function registerAndLoginUser() {
  const agent = request.agent(app);

  await agent.post("/api/auth/register").send(validRegistrationPayload);
  await agent.post("/api/auth/login").send({
    email: validRegistrationPayload.email,
    password: validRegistrationPayload.password,
  });

  return agent;
}

describe("Refresh Access Token Route Tests", () => {
  it("should issue a new access token and rotate the refresh token", async () => {
    const agent = await registerAndLoginUser();

    const initialRefreshToken = await prisma.refreshToken.findFirst({
      where: {
        session: {
          user: {
            emailIdentities: {
              some: {
                email: validRegistrationPayload.email,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const response = await agent.post("/api/auth/token-refresh");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      accessToken: expect.any(String),
    });
    expect(response.headers["set-cookie"]).toEqual(
      expect.arrayContaining([expect.stringContaining("refreshToken=")]),
    );

    const refreshedToken = await prisma.refreshToken.findUnique({
      where: {
        id: initialRefreshToken!.id,
      },
    });

    const rotatedToken = await prisma.refreshToken.findFirst({
      where: {
        sessionId: initialRefreshToken!.sessionId,
        id: {
          not: initialRefreshToken!.id,
        },
      },
    });

    expect(refreshedToken!.revokedAt).not.toBeNull();
    expect(rotatedToken).not.toBeNull();
  });

  it("should reject refresh requests without a refresh cookie", async () => {
    const response = await request(app).post("/api/auth/token-refresh");

    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      code: "RESOURCE_BLOCKED",
      message: "You are unauthorized to access this resource",
    });
  });

  it("should reject refresh requests with an invalid refresh cookie", async () => {
    const response = await request(app)
      .post("/api/auth/token-refresh")
      .set("Cookie", ["refreshToken=invalid-token"]);

    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      code: "RESOURCE_BLOCKED",
      message: "You are unauthorized to access this resource",
    });
  });
});

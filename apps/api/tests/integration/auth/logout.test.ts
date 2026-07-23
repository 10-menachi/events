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
  await request(app)
    .post("/api/auth/register")
    .send(validRegistrationPayload);

  const loginResponse = await request(app).post("/api/auth/login").send({
    email: validRegistrationPayload.email,
    password: validRegistrationPayload.password,
  });

  return {
    accessToken: loginResponse.body.accessToken,
    userId: loginResponse.body.id,
  };
}

describe("Logout Route Tests", () => {
  it("should revoke the current session and clear the refresh cookie", async () => {
    const { accessToken, userId } = await registerAndLoginUser();

    const sessionBeforeLogout = await prisma.session.findFirst({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const response = await request(app)
      .post("/api/auth/logout")
      .set("Authorization", `Bearer ${accessToken}`);

    expect(response.status).toBe(204);
    expect(response.text).toBe("");
    expect(response.headers["set-cookie"]).toEqual(
      expect.arrayContaining([expect.stringContaining("refreshToken=")]),
    );

    const sessionAfterLogout = await prisma.session.findUnique({
      where: {
        id: sessionBeforeLogout!.id,
      },
    });
    const refreshToken = await prisma.refreshToken.findFirst({
      where: {
        sessionId: sessionBeforeLogout!.id,
      },
    });

    expect(sessionAfterLogout!.revokedAt).not.toBeNull();
    expect(refreshToken!.revokedAt).not.toBeNull();
  });

  it("should reject logout without an authorization header", async () => {
    const response = await request(app).post("/api/auth/logout");

    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      code: "RESOURCE_BLOCKED",
      message: "You are unauthorized to access this resource",
    });
  });
});

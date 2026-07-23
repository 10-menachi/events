import { beforeEach, describe, expect, it } from "vitest";
import request from "supertest";
import app from "../../../src/app";
import { resetDatabase } from "../../setup/database";

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

describe("Me Route Tests", () => {
  it("should return the authenticated user's profile", async () => {
    const { accessToken, userId } = await registerAndLoginUser();

    const response = await request(app)
      .get("/api/user/me")
      .set("Authorization", `Bearer ${accessToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: userId,
      fullName: validRegistrationPayload.fullName,
      email: validRegistrationPayload.email,
      userName: null,
      avatarUrl: null,
    });
  });

  it("should reject access without an authorization header", async () => {
    const response = await request(app).get("/api/user/me");

    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      code: "RESOURCE_BLOCKED",
      message: "You are unauthorized to access this resource",
    });
  });
});

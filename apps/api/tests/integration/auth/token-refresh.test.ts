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

describe("Token refresh tests", () => {
  it("should issue a new access token when a valid refresh cookie is present", async () => {
    await request(app)
      .post("/api/auth/register")
      .send(validRegistrationPayload);

    const loginResponse = await request(app).post("/api/auth/login").send({
      email: validRegistrationPayload.email,
      password: validRegistrationPayload.password,
    });

    const agent = request.agent(app);

    await agent.post("/api/auth/login").send({
      email: validRegistrationPayload.email,
      password: validRegistrationPayload.password,
    });

    const response = await agent.post("/api/auth/token-refresh");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      accessToken: expect.any(String),
    });

    expect(loginResponse.body.accessToken).not.toBe(response.body.accessToken);
  });

  it("should reject refresh requests without a refresh token cookie", async () => {
    const response = await request(app).post("/api/auth/token-refresh");

    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      code: "MISSING_REFRESH_TOKEN",
      message: "Refresh token is required",
    });
  });
});

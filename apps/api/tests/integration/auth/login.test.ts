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

describe("Registration Tests", () => {
  it("should login successfully with valid credentials", async () => {
    await request(app)
      .post("/api/auth/register")
      .send(validRegistrationPayload);

    const response = await request(app).post("/api/auth/login").send({
      email: validRegistrationPayload.email,
      password: validRegistrationPayload.password,
    });

    expect(response.status).toBe(200);

    expect(response.body).toEqual({
      id: expect.any(String),
      fullName: validRegistrationPayload.fullName,
      email: validRegistrationPayload.email,
    });
  });
});

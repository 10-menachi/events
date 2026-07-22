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
      accessToken: expect.any(String),
    });
  });

  it("should reject login with invalid credentials", async () => {
    await request(app)
      .post("/api/auth/register")
      .send(validRegistrationPayload);

    const response = await request(app).post("/api/auth/login").send({
      email: validRegistrationPayload.email,
      password: "wrongpassword",
    });

    expect(response.status).toBe(401);

    expect(response.body).toEqual({
      code: "INVALID_CREDENTIALS",
      message: "Invalid email or password",
    });
  });

  it("should reject login for unregistered users", async () => {
    const response = await request(app).post("/api/auth/login").send({
      email: "unregistered@example.com",
      password: "password123",
    });

    expect(response.status).toBe(401);

    expect(response.body).toEqual({
      code: "INVALID_CREDENTIALS",
      message: "Invalid email or password",
    });
  });

  it("should reject login with missing email", async () => {
    const response = await request(app).post("/api/auth/login").send({
      password: validRegistrationPayload.password,
    });

    expect(response.status).toBe(400);

    expect(response.body.code).toBe("VALIDATION_ERROR");

    expect(response.body.errors).toContainEqual({
      path: "email",
      message: "Email is required",
    });
  });

  it("should reject login with missing password", async () => {
    const response = await request(app).post("/api/auth/login").send({
      email: validRegistrationPayload.email,
    });

    expect(response.status).toBe(400);

    expect(response.body.code).toBe("VALIDATION_ERROR");

    expect(response.body.errors).toContainEqual({
      path: "password",
      message: "Password is required",
    });
  });
});

import { beforeEach, describe, expect, it } from "vitest";
import request from "supertest";
import app from "../../../src/app";
import { resetDatabase } from "../../setup/database";
import logger from "../../../src/lib/logger";
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

  it("should reject login with missing email and password", async () => {
    const response = await request(app).post("/api/auth/login").send({});

    expect(response.status).toBe(400);

    expect(response.body.code).toBe("VALIDATION_ERROR");

    expect(response.body.errors).toContainEqual({
      path: "email",
      message: "Email is required",
    });

    expect(response.body.errors).toContainEqual({
      path: "password",
      message: "Password is required",
    });
  });

  it("should reject login with invalid email", async () => {
    const response = await request(app).post("/api/auth/login").send({
      email: "invalid-email",
      password: "password123",
    });

    expect(response.status).toBe(400);

    expect(response.body.code).toBe("VALIDATION_ERROR");

    expect(response.body.errors).toContainEqual({
      path: "email",
      message: "Invalid email address",
    });
  });

  it("should test that the refresh cookie is set after login", async () => {
    await request(app)
      .post("/api/auth/register")
      .send(validRegistrationPayload);

    const response = await request(app).post("/api/auth/login").send({
      email: validRegistrationPayload.email,
      password: validRegistrationPayload.password,
    });

    expect(response.headers["set-cookie"]).toBeDefined();

    const cookies = response.headers["set-cookie"];

    expect(cookies).toEqual(
      expect.arrayContaining([expect.stringContaining("refreshToken=")]),
    );
  });

  it("should test that a session is created when a user logs in", async () => {
    await request(app)
      .post("/api/auth/register")
      .send(validRegistrationPayload);

    const response = await request(app).post("/api/auth/login").send({
      email: validRegistrationPayload.email,
      password: validRegistrationPayload.password,
    });

    const session = await prisma.session.findFirst({
      where: {
        userId: response.body.id,
      },
    });

    expect(session).not.toBeNull();
    expect(session!.revokedAt).toBeNull();
  });
});

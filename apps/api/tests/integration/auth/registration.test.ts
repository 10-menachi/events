import { describe, expect, it } from "vitest";
import app from "../../../src/app";
import request from "supertest";
import { testRegistrationPayload } from "../../../src/lib/utils/helpers";

const validRegistrationPayload = {
  fullName: "Wamalwa Christian Timbe",
  email: "timbe@example.com",
  password: "Christian2002",
  passwordConfirmation: "Christian2002",
};

describe("Registration Tests", () => {
  it("should register a new user successfully provided a valid request", async () => {
    const payload = testRegistrationPayload();

    const response = await request(app)
      .post("/api/auth/register")
      .send(payload);

    expect(response.status).toBe(201);

    expect(response.body).toHaveProperty("id");

    expect(response.body).toHaveProperty("fullName", payload.fullName);

    expect(response.body).toHaveProperty("email", payload.email);
  });

  it("should reject registration with an invalid email", async () => {
    const response = await request(app)
      .post("/api/auth/register")
      .send({
        ...validRegistrationPayload,
        email: "invalid-email",
      });

    expect(response.status).toBe(400);

    expect(response.body.code).toBe("VALIDATION_ERROR");

    expect(response.body.errors).toContainEqual({
      path: "email",
      message: "Invalid email address",
    });
  });

  it("should reject registration when passwords do not match", async () => {
    const response = await request(app)
      .post("/api/auth/register")
      .send({
        ...validRegistrationPayload,
        passwordConfirmation: "non-matching-password",
      });

    expect(response.status).toBe(400);

    expect(response.body.code).toBe("VALIDATION_ERROR");

    expect(response.body.errors).toContainEqual({
      path: "passwordConfirmation",
      message: "Passwords do not match",
    });
  });

  it("should reject registration when password length is less than 8 characters", async () => {
    const response = await request(app)
      .post("/api/auth/register")
      .send({
        ...validRegistrationPayload,
        password: "1234567",
        passwordConfirmation: "1234567",
      });

    expect(response.status).toBe(400);

    expect(response.body.code).toBe("VALIDATION_ERROR");

    expect(response.body.errors).toContainEqual({
      path: "password",
      message: "Password must be at least 8 characters long",
    });
  });

  it("should reject registration when fullName is missing", async () => {
    const response = await request(app).post("/api/auth/register").send({
      email: "john@example.com",
      password: "password123",
      passwordConfirmation: "password123",
    });

    expect(response.status).toBe(400);

    expect(response.body.code).toBe("VALIDATION_ERROR");

    expect(response.body.errors).toContainEqual({
      path: "fullName",
      message: "Full name is required",
    });
  });

  it("should reject registration when email is missing", async () => {
    const response = await request(app).post("/api/auth/register").send({
      fullName: "John Doe",
      password: "password123",
      passwordConfirmation: "password123",
    });

    expect(response.status).toBe(400);

    expect(response.body.code).toBe("VALIDATION_ERROR");

    expect(response.body.errors).toContainEqual({
      path: "email",
      message: "Email is required",
    });
  });

  it("should reject registration when fields are empty", async () => {
    const response = await request(app).post("/api/auth/register").send({
      fullName: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    });

    expect(response.status).toBe(400);

    expect(response.body.code).toBe("VALIDATION_ERROR");

    expect(response.body.errors).toEqual(
      expect.arrayContaining([
        {
          path: "fullName",
          message: "Full name should be at least 2 characters long",
        },
        {
          path: "email",
          message: "Invalid email address",
        },
        {
          path: "password",
          message: "Password must be at least 8 characters long",
        },
        {
          path: "passwordConfirmation",
          message: "Password confirmation must be at least 8 characters long",
        },
      ]),
    );
  });
});

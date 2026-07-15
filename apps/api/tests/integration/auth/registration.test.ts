import { describe, expect, it } from "vitest";
import app from "../../../src/app";
import request from "supertest";
import { testRegistrationPayload } from "../../../src/lib/utils/helpers";

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
});

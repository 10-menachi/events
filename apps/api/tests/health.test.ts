import { describe, expect, it } from "vitest";
import app from "../src/app";
import request from "supertest";

describe("GET /health", () => {
  it("Checks that the application is healthy", async () => {
    const response = await request(app).get("/health");

    expect(response.status).toBe(200);

    expect(response.body.status).toBe("OK");

    expect(response.body.timeStamp).toBeDefined();

    expect(new Date(response.body.timeStamp).toISOString()).not.toBe(
      "Invalid Date",
    );
  });

  it("loads test database", () => {
    expect(process.env.DATABASE_URL).toContain("events_test");
  });
});

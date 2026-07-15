export function testRegistrationPayload(overrides = {}) {
  return {
    fullName: "Test User",
    email: `test-${crypto.randomUUID()}@example.com`,
    password: "password123",
    passwordConfirmation: "password123",
    ...overrides,
  };
}

export function testRegistrationPayload(overrides = {}) {
  return {
    fullName: "Test User",
    email: `test-${crypto.randomUUID()}@example.com`,
    password: "password123",
    passwordConfirmation: "password123",
    ...overrides,
  };
}

export function daysFromNow(days: number) {
  return new Date(Date.now() + days * 24 * 60 * 60 * 1000);
}

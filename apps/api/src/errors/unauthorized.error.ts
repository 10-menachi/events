import AppError from "./app.error";

export default class UnauthorizedError extends AppError {
  constructor() {
    super(
      401,
      "RESOURCE_BLOCKED",
      "You are unauthorized to access this resource",
    );
  }
}

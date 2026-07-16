import AppError from "./app.error";

export class InvalidCredentialsError extends AppError {
  constructor() {
    super(401, "INVALID_CREDENTIALS", "Invalid email or password");
  }
}

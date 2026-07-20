import AppError from "./app.error";

export default class UnauthorizedError extends AppError {
  constructor(code: string, message: string) {
    super(401, code, message);
  }
}

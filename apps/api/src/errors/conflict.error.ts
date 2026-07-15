import AppError from "./app.error";

export default class ConflictError extends AppError {
  constructor(code: string, message: string) {
    super(409, code, message);
  }
}

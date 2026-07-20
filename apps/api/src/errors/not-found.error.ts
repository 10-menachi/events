import AppError from "./app.error";

export default class NotFoundError extends AppError {
  constructor() {
    super(404, "NOT_FOUND", "Resource not found");
  }
}

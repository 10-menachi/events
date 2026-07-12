import express from "express";
import { requestId } from "./middleware/request-id";
import { requestLogger } from "./middleware/logger";
import { errorHandler } from "./middleware/error-handler";

const app = express();

app.use(express.json());

app.use(requestId);

app.use(requestLogger);

app.use(errorHandler);

export default app;

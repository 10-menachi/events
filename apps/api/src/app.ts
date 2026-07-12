import express from "express";
import { requestId } from "./middleware/request-id";
import { requestLogger } from "./middleware/logger";
import { errorHandler } from "./middleware/error-handler";
import router from "./routes";

const app = express();

app.use(express.json());

app.use(requestId);

app.use(requestLogger);

app.use(router);

app.use(errorHandler);

export default app;

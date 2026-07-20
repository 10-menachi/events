import express from "express";
import { requestId } from "./middleware/request-id";
import { requestLogger } from "./middleware/logger";
import { errorHandler } from "./middleware/error-handler";
import router from "./routes";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());

app.use(requestId);

app.use(requestLogger);

app.use(router);

app.use(errorHandler);

app.use(cookieParser());

export default app;

import express from "express";
import cookieParser from "cookie-parser";
import { requestId } from "./middleware/request-id";
import { requestLogger } from "./middleware/logger";
import { errorHandler } from "./middleware/error-handler";
import router from "./routes";

const app = express();

app.use(express.json());

app.use(cookieParser());

app.use(requestId);

app.use(requestLogger);

app.use(router);

app.use(errorHandler);

export default app;

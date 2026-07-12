import app from "./app";
import { env } from "./config";
import { connectDatabase } from "./lib/database";
import logger from "./lib/logger";

async function bootstrap() {
    await connectDatabase();

    app.listen(env.port, () => {
        logger.info(`Server running on port ${env.port}`);
    });
}

bootstrap();
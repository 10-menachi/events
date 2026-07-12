import app from "./app";
import { env } from "./config";
import { connectDatabase } from "./lib/database";
import logger from "./lib/logger";

async function bootstrap() {
  try {
    await connectDatabase();

    app.listen(env.port, () => {
      logger.info(`Server running on port ${env.port}`);
    });
  } catch (error) {
    logger.error(error, "Failed to start application");
    process.exit(1);
  }
}

bootstrap();

import app from "./app";
import { env } from "./config";
import { connectDatabase } from "./lib/database";

async function bootstrap() {
    await connectDatabase();

    app.listen(env.port, () => {
        console.log(`Server running on port ${env.port}`);
    });
}

bootstrap();
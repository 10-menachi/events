import logger from "./logger";
import prisma from "./prisma";

export async function connectDatabase() {
    await prisma.$connect();

    logger.info("Database connected");
}
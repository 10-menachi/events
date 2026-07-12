import prisma from "./prisma";

export async function connectDatabase() {
    await prisma.$connect();

    console.log("Database connected");
}
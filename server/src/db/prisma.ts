import { PrismaClient } from "@prisma/client";

// fix warning from Prisma Client in development
declare global {
  var prisma: PrismaClient | undefined;
}

const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV === "development") global.prisma = prisma;

export default prisma;

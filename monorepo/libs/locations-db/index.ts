import { enhance } from "@zenstackhq/runtime";
import { PrismaClient } from "./prisma/client";

const prisma = new PrismaClient();

export const locationsDb = enhance(prisma);

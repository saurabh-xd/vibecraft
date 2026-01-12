import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({ 
    connectionString: process.env.DATABASE_URL 
  });

const prismaClientSingleleton = () =>{
    return new PrismaClient({
        adapter
    })
}

declare const globalThis: {
    prismaGlobal: ReturnType<typeof prismaClientSingleleton>;

} & typeof global;
const prisma = globalThis.prismaGlobal ?? prismaClientSingleleton()

export default prisma
 if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma
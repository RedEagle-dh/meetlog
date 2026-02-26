import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres";

const db: NodePgDatabase = drizzle(process.env.DATABASE_URL!);

export { db };

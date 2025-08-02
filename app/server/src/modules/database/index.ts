import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const database = drizzle({
  client: new Pool({
    connectionString: process.env.DATABASE_URL!,
    ssl: true,
  }),
});

export default database;

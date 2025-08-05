import * as rolesSchema from "@/modules/database/schemas/roles";
import * as rolesToUsersSchema from "@/modules/database/schemas/roles-to-users";
import * as sessionsSchema from "@/modules/database/schemas/sessions";
import * as usersSchema from "@/modules/database/schemas/users";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const database = drizzle({
  client: new Pool({
    connectionString: process.env.DATABASE_URL!,
    ssl: true,
  }),
  schema: {
    ...rolesSchema,
    ...rolesToUsersSchema,
    ...sessionsSchema,
    ...usersSchema,
  },
});

export default database;

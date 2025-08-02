import { identity, timestamps } from "@/modules/database/schemas/columns";
import { pgTable, timestamp, varchar } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  ...identity,
  username: varchar("username", { length: 50 }).unique().notNull(),
  email: varchar("email", { length: 350 }).unique().notNull(),
  password: varchar("password", { length: 100 }).unique().notNull(),
  verifiedAt: timestamp("verified_at"),
  ...timestamps,
});

export type User = typeof users.$inferSelect;

import { identity, timestamps } from "@/modules/database/schemas/columns";
import { rolesToUsers } from "@/modules/database/schemas/roles-to-users";
import { sessions } from "@/modules/database/schemas/sessions";
import { relations } from "drizzle-orm";
import { pgTable, timestamp, varchar } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  ...identity,
  username: varchar("username", { length: 50 }).unique().notNull(),
  email: varchar("email", { length: 350 }).unique().notNull(),
  password: varchar("password", { length: 100 }).unique().notNull(),
  verifiedAt: timestamp("verified_at"),
  ...timestamps,
});

export const usersRelations = relations(users, ({ many }) => ({
  sessions: many(sessions),
  roles: many(rolesToUsers),
}));

export type User = typeof users.$inferSelect;

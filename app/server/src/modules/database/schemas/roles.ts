import { identity, timestamps } from "@/modules/database/schemas/columns";
import { rolesToUsers } from "@/modules/database/schemas/roles-to-users";
import { relations } from "drizzle-orm";
import { pgTable, varchar } from "drizzle-orm/pg-core";

export const roles = pgTable("roles", {
  ...identity,
  name: varchar("name", { length: 100 }).unique().notNull(),
  ...timestamps,
});

export const rolesRelations = relations(roles, ({ many }) => ({
  users: many(rolesToUsers),
}));

export type Role = typeof roles.$inferSelect;

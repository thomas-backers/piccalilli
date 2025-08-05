import { roles } from "@/modules/database/schemas/roles";
import { users } from "@/modules/database/schemas/users";
import { relations } from "drizzle-orm";
import { integer, pgTable, primaryKey } from "drizzle-orm/pg-core";

export const rolesToUsers = pgTable(
  "roles_to_users",
  {
    userId: integer("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    roleId: integer("role_id")
      .notNull()
      .references(() => roles.id, { onDelete: "cascade" }),
  },
  (table) => [primaryKey({ columns: [table.userId, table.roleId] })]
);

export const rolesToUsersRelations = relations(rolesToUsers, ({ one }) => ({
  user: one(users, {
    fields: [rolesToUsers.userId],
    references: [users.id],
  }),
  role: one(roles, {
    fields: [rolesToUsers.roleId],
    references: [roles.id],
  }),
}));

export type RoleToUser = typeof rolesToUsers.$inferSelect;

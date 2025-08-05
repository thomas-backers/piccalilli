import { identity, timestamps } from "@/modules/database/schemas/columns";
import { users } from "@/modules/database/schemas/users";
import { relations } from "drizzle-orm";
import { integer, pgTable, timestamp } from "drizzle-orm/pg-core";

export const sessions = pgTable("sessions", {
  ...identity,
  expiresAt: timestamp("expires_at").notNull(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  ...timestamps,
});

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
}));

export type Session = typeof sessions.$inferSelect;

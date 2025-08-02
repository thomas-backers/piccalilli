import { integer, varchar, timestamp } from "drizzle-orm/pg-core";

export const identity = {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  publicId: varchar("public_id", { length: 30 }).unique().notNull(),
};

export const timestamps = {
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at"),
};

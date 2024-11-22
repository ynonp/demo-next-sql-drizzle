import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const usersTable = sqliteTable("users", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
});

export const linksTable = sqliteTable("links", {
  id: int().primaryKey({ autoIncrement: true }),
  user_id: int().references(() => usersTable.id, {onDelete: 'cascade'}).notNull(),
  href: text().notNull(),
});

export const likesTable = sqliteTable('likes', {
  id: int().primaryKey({autoIncrement: true}),
  user_id: int().references(() => usersTable.id, {onDelete: 'cascade'}).notNull(),
  link_id: int().references(() => linksTable.id, {onDelete: 'cascade'}).notNull(),
});

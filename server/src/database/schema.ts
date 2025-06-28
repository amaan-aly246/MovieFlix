import {
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
export const userTable = pgTable("user_table", {
  userId: uuid("user_id").defaultRandom().primaryKey(),
  name: text("name").notNull().default(" "),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  refreshToken: text("refresh_token"),
  savedMoviesIds: text("saved_movies_ids").array().notNull().default([]),
});

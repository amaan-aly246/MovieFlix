CREATE TABLE "user_table" (
	"user_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"refresh_token" text,
	"saved_movies_ids" text[] DEFAULT '{}' NOT NULL,
	CONSTRAINT "user_table_email_unique" UNIQUE("email")
);

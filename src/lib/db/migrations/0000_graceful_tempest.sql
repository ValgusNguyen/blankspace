CREATE TABLE "notes" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"slug" text NOT NULL,
	"excerpt" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "notes_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "note_contents" (
	"note_id" text PRIMARY KEY NOT NULL,
	"content" text
);
--> statement-breakpoint
ALTER TABLE "note_contents" ADD CONSTRAINT "note_contents_note_id_notes_id_fk" FOREIGN KEY ("note_id") REFERENCES "public"."notes"("id") ON DELETE cascade ON UPDATE no action;
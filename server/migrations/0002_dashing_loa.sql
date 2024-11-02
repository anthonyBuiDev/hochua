ALTER TABLE "parameters" ADD COLUMN "TT" text;--> statement-breakpoint
ALTER TABLE "parameters" DROP COLUMN IF EXISTS "category";
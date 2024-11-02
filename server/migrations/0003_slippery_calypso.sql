ALTER TABLE "parameters" ADD COLUMN "tt" text;--> statement-breakpoint
ALTER TABLE "parameters" DROP COLUMN IF EXISTS "TT";
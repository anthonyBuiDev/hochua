CREATE TYPE "public"."workspaceroles" AS ENUM('user', 'editor', 'admin');--> statement-breakpoint
ALTER TABLE "members" ADD COLUMN "workspaceroles" "workspaceroles" DEFAULT 'user';--> statement-breakpoint
ALTER TABLE "members" DROP COLUMN IF EXISTS "workspaceRole";--> statement-breakpoint
DROP TYPE "public"."workspaceRole";
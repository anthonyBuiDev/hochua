CREATE TYPE "public"."workspaceRole" AS ENUM('user', 'editor', 'admin');--> statement-breakpoint
ALTER TABLE "members" ADD COLUMN "workspaceRole" "roles" DEFAULT 'user';--> statement-breakpoint
ALTER TABLE "members" DROP COLUMN IF EXISTS "workspaceRoles";--> statement-breakpoint
DROP TYPE "public"."workspaceRoles";
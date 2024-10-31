CREATE TYPE "public"."workspaceRoles" AS ENUM('user', 'editor', 'admin');--> statement-breakpoint
ALTER TABLE "members" ALTER COLUMN "workspaceRoles" SET DATA TYPE workspaceRoles;--> statement-breakpoint
DROP TYPE "public"."workspaceroles";
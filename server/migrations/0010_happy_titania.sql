ALTER TABLE "members" ADD COLUMN "workspaceRoles" "workspaceroles" DEFAULT 'user';--> statement-breakpoint
ALTER TABLE "members" DROP COLUMN IF EXISTS "workspaceroles";
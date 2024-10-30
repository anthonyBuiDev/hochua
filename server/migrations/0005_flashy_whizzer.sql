ALTER TABLE "members" ALTER COLUMN "createdAt" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "members" ALTER COLUMN "updatedAt" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "members" ADD COLUMN "workspaceRoles" "roles" DEFAULT 'user';--> statement-breakpoint
ALTER TABLE "members" DROP COLUMN IF EXISTS "roles";
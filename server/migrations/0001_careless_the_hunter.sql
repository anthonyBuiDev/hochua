CREATE TABLE IF NOT EXISTS "waterLevelDischarge" (
	"id" serial PRIMARY KEY NOT NULL,
	"waterLevel" text,
	"gateOpening" text,
	"dischargeRate" text,
	"status" text,
	"workspaceId" text,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DROP TABLE "waterLevelDischargeRelation";--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "waterLevelDischarge" ADD CONSTRAINT "waterLevelDischarge_workspaceId_workspaces_id_fk" FOREIGN KEY ("workspaceId") REFERENCES "public"."workspaces"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

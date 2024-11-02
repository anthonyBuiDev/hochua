ALTER TABLE "lakeCharacteristics" ALTER COLUMN "elevation" SET DATA TYPE numeric;--> statement-breakpoint
ALTER TABLE "lakeCharacteristics" ALTER COLUMN "surfaceArea" SET DATA TYPE numeric;--> statement-breakpoint
ALTER TABLE "lakeCharacteristics" ALTER COLUMN "volume" SET DATA TYPE numeric;--> statement-breakpoint
ALTER TABLE "parameters" ALTER COLUMN "title" DROP NOT NULL;
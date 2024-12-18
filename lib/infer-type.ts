import * as schema from "@/server/schema";
import type {
  BuildQueryResult,
  DBQueryConfig,
  ExtractTablesWithRelations,
} from "drizzle-orm";

type Schema = typeof schema;
type TSchema = ExtractTablesWithRelations<Schema>;

export type IncludeRelation<TableName extends keyof TSchema> = DBQueryConfig<
  "one" | "many",
  boolean,
  TSchema,
  TSchema[TableName]
>["with"];

export type InferResultType<
  TableName extends keyof TSchema,
  With extends IncludeRelation<TableName> | undefined = undefined,
> = BuildQueryResult<
  TSchema,
  TSchema[TableName],
  {
    with: With;
  }
>;

export type Members = InferResultType<"members", { user: true }>;
export type Parameters = InferResultType<"parameters">;
export type characteristic = InferResultType<"lakeCharacteristics">;
export type q = InferResultType<"waterLevelDischarges">;
export type Workspaces = InferResultType<
  "workspaces",
  { members: { with: { user: true } }; workspaces: true }
>;

import * as z from "zod";

export const LakeCharacteristicSchema = z.object({
  id: z.number().optional(),
  elevation: z.string().optional(),
  surfaceArea: z.string().optional(),
  volume: z.string().optional(),
  workspaceId: z.string(),
});

export type zLakeCharacteristicSchema = z.infer<typeof LakeCharacteristicSchema>;

import * as z from "zod";

export const WaterLevelSchema = z.object({
  id: z.number().optional(),
  limitLevel: z.string().optional(),
  emergencyLevel: z.string().optional(),
  date: z.string().optional(),
  workspaceId: z.string(),
});

export type zWaterLevelSchema = z.infer<typeof WaterLevelSchema>;

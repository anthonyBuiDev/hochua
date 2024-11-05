import * as z from "zod";

export const WaterLevelDischargeSchema = z.object({
  id: z.number().optional(),
  waterLevel: z.string().optional(),
  gateOpening: z.string().optional(),
  dischargeRate: z.string().optional(),
  type: z.string(),
  workspaceId: z.string(),
});


export type zWaterLevelDischargeSchema = z.infer<typeof WaterLevelDischargeSchema>;

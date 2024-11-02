import * as z from "zod";


export const ParameterSchema = z.object({
  id: z.number().optional(),
  tt: z.string().optional(),
  title: z.string().optional(),
  unit: z.string().optional(),
  value: z.string().optional(),
  workspaceId: z.string(),
});

export type zParameterSchema = z.infer<typeof ParameterSchema>;

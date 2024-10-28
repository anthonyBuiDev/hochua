import * as z from "zod"

export const ParameterSchema = z.object({
  id: z.number().optional(),
  tt: z.union([z.number(), z.string()]),
  title: z.string(),
  unit: z.string(),
  value: z.union([z.number(), z.string()]),
})

export type zParameterSchema = z.infer<typeof ParameterSchema>


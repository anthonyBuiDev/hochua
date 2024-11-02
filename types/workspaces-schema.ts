import * as z from "zod";

export const WorkspacesSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(5, {
    message: "Name must be at least 5 characters long",
  }),
});

export type zWorkspacesSchema = z.infer<typeof WorkspacesSchema>;

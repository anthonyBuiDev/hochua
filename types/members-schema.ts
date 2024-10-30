import * as z from "zod";

const ZWorkspaceRoleEnum = z.enum(["user", "editor", "admin"]);

export const MembersSchema = z.object({
  id: z.string().optional(),
  workspaceRoles: ZWorkspaceRoleEnum,
  editMode: z.boolean(),
  workspaceId: z.string(),
  userId: z.string(),
})

export type zMembersSchema = z.infer<typeof MembersSchema>
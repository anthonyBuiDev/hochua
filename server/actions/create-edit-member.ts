"use server"

import { eq } from "drizzle-orm"

import { actionClient } from "@/lib/safe-action"
import { MembersSchema } from "@/types/members-schema"
import { revalidatePath } from "next/cache"
import { db } from ".."
import { members, users } from "../schema"




export const createEditMember = actionClient.schema(MembersSchema).action(
  async ({ parsedInput: {
    editMode,
    id,
    workspaceId,
    userId,
    workspaceRoles,
  } }) => {
    try {
      if (editMode && id) {
        await db
          .update(members)
          .set({ userId, workspaceId, workspaceRoles, updatedAt: new Date() })
          .where(eq(members.id, id))
          .returning()

        const member = await db.query.members.findFirst({
          where: eq(users.id, userId),
          with: {
            user: true,
          },
        })

        const nameMember = member?.user?.name;

        revalidatePath("/dashboard/workspaces")
        return { success: `Edited ${nameMember}` }
      }
      if (!editMode) {
        await db
          .insert(members)
          .values({
            userId,
            workspaceId,
            workspaceRoles: "user",
          })
          .returning()

        const member = await db.query.members.findFirst({
          where: eq(users.id, userId),
          with: {
            user: true,
          },
        })

        const nameMember = member?.user?.name;

        revalidatePath("/dashboard/workspaces")
        return { success: `Added ${nameMember} ` }
      }
    } catch (error) {
      console.log(error)
      return { error: "Failed to create variant" }
    }
  }
)
"use server"

import { actionClient } from "@/lib/safe-action"

import { eq } from "drizzle-orm"

import { revalidatePath } from "next/cache"
import * as z from "zod"
import { db } from ".."
import { members, users } from "../schema"





export const deleteMember = actionClient.schema(z.object({ id: z.string() })).action(
  async ({ parsedInput: { id } }) => {
    try {
      const deleteMember = await db
        .delete(members)
        .where(eq(members.id, id))
        .returning()

      const member = await db.query.members.findFirst({
        where: eq(users.id, deleteMember[0].userId!),
        with: {
          user: true,
        },
      })

      const nameMember = member?.user?.name;


      revalidatePath("dashboard/workspaces")

      return { success: `Deleted ${nameMember}` }
    } catch (error) {
      console.log(error)
      return { error: "Failed to delete member" }
    }
  }
)
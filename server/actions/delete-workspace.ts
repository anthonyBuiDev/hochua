"use server"

import { actionClient } from "@/lib/safe-action"
import { eq } from "drizzle-orm"

import { revalidatePath } from "next/cache"
import * as z from "zod"
import { db } from ".."
import { workspaces } from "../schema"


export const deleteWorkspace = actionClient.schema(z.object({ id: z.string() })).action(
  async ({ parsedInput: { id } }) => {
    try {
      const data = await db
        .delete(workspaces)
        .where(eq(workspaces.id, id))
        .returning()
      revalidatePath("/dashboard/workspaces")
      return { success: `Workspace ${data[0].name} has been deleted` }
    } catch (error) {
      console.log(error)
      return { error: "Failed to delete workspace" }
    }
  }
)
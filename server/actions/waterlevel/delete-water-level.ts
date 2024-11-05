"use server";

import { actionClient } from "@/lib/safe-action";
import { db } from "@/server";
import { waterLevels } from "@/server/schema";
import { eq } from "drizzle-orm";

import { revalidatePath } from "next/cache";
import * as z from "zod";


export const deleteWaterLevel = actionClient
  .schema(z.object({ id: z.string() }))
  .action(async ({ parsedInput: { id } }) => {
    try {
      await db
        .delete(waterLevels)
        .where(eq(waterLevels.workspaceId, id))
        .returning();
      revalidatePath(`/workspaces/`);

      return { success: `Water Level has been deleted` };
    } catch (error) {
      console.log(error);
      return { error: "Failed to delete Water Level" };
    }
  });

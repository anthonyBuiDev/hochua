"use server";

import { actionClient } from "@/lib/safe-action";
import { db } from "@/server";
import { lakeCharacteristics } from "@/server/schema";
import { eq } from "drizzle-orm";

import { revalidatePath } from "next/cache";
import * as z from "zod";


export const deleteLakeCharacteristics = actionClient
  .schema(z.object({ id: z.string() }))
  .action(async ({ parsedInput: { id } }) => {
    try {
      await db
        .delete(lakeCharacteristics)
        .where(eq(lakeCharacteristics.workspaceId, id))
        .returning();
      revalidatePath(`/workspaces/`);

      return { success: `Lake Characteristics has been deleted` };
    } catch (error) {
      console.log(error);
      return { error: "Failed to delete Lake Characteristics" };
    }
  });
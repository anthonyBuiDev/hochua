"use server";

import { actionClient } from "@/lib/safe-action";
import { db } from "@/server";
import { parameters } from "@/server/schema";
import { eq } from "drizzle-orm";

import { revalidatePath } from "next/cache";
import * as z from "zod";


export const deleteParameter = actionClient
  .schema(z.object({ id: z.string() }))
  .action(async ({ parsedInput: { id } }) => {
    try {
      await db
        .delete(parameters)
        .where(eq(parameters.workspaceId, id))
        .returning();
      revalidatePath(`/workspaces/`);
      return { success: "Xóa thành công" };
    } catch (error) {
      console.log(error);
      return { error: "Xóa thất bại" };
    }
  });

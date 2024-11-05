"use server";

import { actionClient } from "@/lib/safe-action";
import { eq } from "drizzle-orm";
import { db } from "@/server";
import { auth } from "@/server/auth";
import { workspaces } from "@/server/schema";
import { revalidatePath } from "next/cache";
import * as z from "zod";

export const deleteWorkspace = actionClient
  .schema(z.object({ id: z.string() }))
  .action(async ({ parsedInput: { id } }) => {
    try {

      const session = await auth();

      if (session?.user?.roles !== 'admin') {
        return { error: "Bạn không phải là admin" };
      }

      const data = await db
        .delete(workspaces)
        .where(eq(workspaces.id, id))
        .returning();
      revalidatePath("/dashboard/workspaces");
      return { success: `Hồ chứa ${data[0].name} đã được xóa` };
    } catch (error) {
      console.log(error);
      return { error: "Xóa hồ chứa thất bại" };
    }
  });

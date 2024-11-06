"use server";
import { actionClient } from "@/lib/safe-action";
import { db } from "@/server";
import { auth } from "@/server/auth";
import { users } from "@/server/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import * as z from "zod";

export const deleteUser = actionClient
  .schema(z.object({ id: z.string() }))
  .action(async ({ parsedInput: { id } }) => {
    try {
      const session = await auth();

      if (session?.user?.roles !== 'admin') {
        return { error: "Bạn không phải là admin" };
      }

      if (id === session?.user?.id) {
        return { error: "bạn không thể xóa chính mình" };
      }

      const deletedUser = await db
        .delete(users)
        .where(eq(users.id, id))
        .returning();

      revalidatePath("dashboard/users");
      return { success: `Xóa ${deletedUser[0].name} thành công` };
    } catch (error) {
      console.log(error);
      return { error: "Xóa thành viên thất bại" };
    }
  });




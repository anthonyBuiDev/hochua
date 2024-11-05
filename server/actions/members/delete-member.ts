"use server";
import { actionClient } from "@/lib/safe-action";
import { db } from "@/server";
import { auth } from "@/server/auth";
import { members } from "@/server/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import * as z from "zod";

export const deleteMember = actionClient
  .schema(z.object({ id: z.string() }))
  .action(async ({ parsedInput: { id } }) => {
    try {
      const session = await auth();

      const loggedInUserId = session?.user?.id!;

      const loggedInUserMember = await db.query.members.findFirst({
        where: eq(members.userId, loggedInUserId),
      });


      if (loggedInUserMember?.workspaceRoles !== 'admin') {
        return { error: "Bạn không phải là admin" };
      }


      if (id === loggedInUserMember.id) {
        return { error: "bạn không thể xóa chính mình" };
      }

      // Proceed with deletion
      const deletedMember = await db
        .delete(members)
        .where(eq(members.id, id))
        .returning();


      const member = await db.query.members.findFirst({
        where: eq(members.id, deletedMember[0].userId!),
        with: {
          user: true,
        },
      });

      const nameMember = member?.user?.name;
      revalidatePath("dashboard/workspaces");

      return { success: `Xóa ${nameMember} thành công` };
    } catch (error) {
      console.log(error);
      return { error: "Xóa thành viên thất bại" };
    }
  });

"use server";
import { actionClient } from "@/lib/safe-action";
import { db } from "@/server";
import { auth } from "@/server/auth";
import { members, workspaces } from "@/server/schema";
import { WorkspacesSchema } from "@/types/workspaces-schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";


export const createEditWorkspace = actionClient
  .schema(WorkspacesSchema)
  .action(async ({ parsedInput: { name, id } }) => {
    try {
      const session = await auth();
      const userId = session?.user?.id;

      if (session?.user?.roles !== 'admin') {
        return { error: "Bạn không phải là admin" };
      }

      if (id) {
        const currentWorkspace = await db.query.workspaces.findFirst({
          where: eq(workspaces.id, id),
        });
        if (!currentWorkspace) return { error: "Không tìm thấy hồ chứa" };
        const editedWorkspace = await db
          .update(workspaces)
          .set({ name })
          .where(eq(workspaces.id, id))
          .returning();
        revalidatePath("/dashboard/workspaces");
        return {
          success: `Hồ chứa ${editedWorkspace[0].name} đã được sửa`,
        };
      }
      if (!id) {
        const newWorkspace = await db
          .insert(workspaces)
          .values({ name, userId })
          .returning();

        const workspaceId = newWorkspace[0].id;

        await db.insert(members).values({
          userId,
          workspaceId,
          workspaceRoles: "admin",
        });

        revalidatePath("/dashboard/workspaces");

        return {
          success: `Hồ chứa ${newWorkspace[0].name} đã được tạo`,
        };
      }
    } catch (error) {
      console.log(error);
      return { error: "Tạo hồ chứa thất bại" };
    }
  });

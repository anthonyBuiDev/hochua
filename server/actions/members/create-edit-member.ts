"use server";

import { actionClient } from "@/lib/safe-action";
import { db } from "@/server";
import { auth } from "@/server/auth";
import { members, users } from "@/server/schema";
import { MembersSchema } from "@/types/members-schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";


export const createEditMember = actionClient
  .schema(MembersSchema)
  .action(
    async ({
      parsedInput: { editMode, id, workspaceId, userId, workspaceRoles },
    }) => {
      try {
        const session = await auth();

        const loggedInUserId = session?.user?.id!;

        const loggedInUserMember = await db.query.members.findFirst({
          where: eq(members.userId, loggedInUserId),
        });

        if (loggedInUserMember?.workspaceRoles !== 'admin') {
          return { error: "Bạn không phải là admin" };
        }


        if (editMode && id) {
          const member = await db.query.members.findFirst({
            where: eq(users.id, userId),
            with: {
              user: true,
            },
          });

          const nameMember = member?.user?.name;

          await db
            .update(members)
            .set({ userId, workspaceId, workspaceRoles, updatedAt: new Date() })
            .where(eq(members.id, id))
            .returning();
          revalidatePath("/dashboard/workspaces");
          return { success: `${nameMember} đã được sửa` };
        }

        if (!editMode) {
          await db
            .insert(members)
            .values({
              userId,
              workspaceId,
              workspaceRoles: "user",
            })
            .returning();

          const member = await db.query.members.findFirst({
            where: eq(users.id, userId),
            with: {
              user: true,
            },
          });

          const nameMember = member?.user?.name;

          revalidatePath("/dashboard/workspaces");
          return { success: `Đã thêm ${nameMember} ` };
        }
      } catch (error) {
        console.log(error);
        return { error: "Không thể thêm thành viên" };
      }
    },
  );

"use server";

import { and, eq } from "drizzle-orm";

import { actionClient } from "@/lib/safe-action";
import { MembersSchema } from "@/types/members-schema";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { db } from "..";
import { auth } from "../auth";
import { members, users, workspaces } from "../schema";

export const getMembers = actionClient
  .schema(z.object({ workspaceId: z.string() }))
  .action(async ({ parsedInput: { workspaceId } }) => {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      throw new Error("User not authenticated");
    }

    const member = await db.query.members.findFirst({
      where: and(eq(users.id, userId), eq(workspaces.id, workspaceId)),
      with: {
        user: true,
      },
    });

    const isAdmin = member?.workspaceRoles === "admin";

    return {
      isAdmin,
      member,
    };
  });

export const createEditMember = actionClient
  .schema(MembersSchema)
  .action(
    async ({
      parsedInput: { editMode, id, workspaceId, userId, workspaceRoles },
    }) => {
      try {
        const member = await getMembers({ workspaceId });
        console.log(member);

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
          return { success: `Edited ${nameMember}` };
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
          return { success: `Added ${nameMember} ` };
        }
      } catch (error) {
        console.log(error);
        return { error: "Failed to create variant" };
      }
    },
  );

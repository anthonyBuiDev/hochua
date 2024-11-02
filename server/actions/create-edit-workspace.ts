"use server";

import { actionClient } from "@/lib/safe-action";
import { WorkspacesSchema } from "@/types/workspaces-schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "..";
import { auth } from "../auth";
import { members, workspaces } from "../schema";

export const createEditWorkspace = actionClient
  .schema(WorkspacesSchema)
  .action(async ({ parsedInput: { name, id } }) => {
    try {
      const session = await auth();
      const userId = session?.user?.id;

      if (id) {
        const currentWorkspace = await db.query.workspaces.findFirst({
          where: eq(workspaces.id, id),
        });
        if (!currentWorkspace) return { error: "Workspace not found" };
        const editedWorkspace = await db
          .update(workspaces)
          .set({ name })
          .where(eq(workspaces.id, id))
          .returning();
        revalidatePath("/dashboard/workspaces");
        return {
          success: `Workspace ${editedWorkspace[0].name} has been edited`,
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
          success: `Workspace ${newWorkspace[0].name} has been created`,
        };
      }
    } catch (error) {
      console.log(error);
      return { error: "Failed to create Workspace" };
    }
  });

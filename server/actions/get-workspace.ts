"use server";

import { eq, inArray } from "drizzle-orm";
import { db } from "..";

import { members, workspaces } from "../schema";

export async function getWorkspaceById(id: string) {
  try {
    const workspace = await db.query.workspaces.findFirst({
      where: eq(workspaces.id, id),
    });
    if (!workspace) throw new Error("Workspace not found");
    return { success: workspace };
  } catch (error) {
    console.error(error);
    return { error: "Failed to get workspace" };
  }
}

export async function getWorkspacesByUserId(userId: string) {
  try {
    const userMembers = await db.query.members.findMany({
      where: eq(members.userId, userId),
    });

    const workspaceIds = userMembers.map((member) => member.workspaceId);
    //TODO: remove null values from workspaceIds
    const workspaceList = await db.query.workspaces.findMany({
      where: inArray(
        workspaces.id,
        workspaceIds.filter((id): id is string => id !== null),
      ),
      with: {
        members: {
          with: {
            user: true,
          },
        },
      },
      orderBy: (workspaceList, { desc }) => [desc(workspaceList.id)],
    });

    return workspaceList;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

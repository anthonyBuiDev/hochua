"use server"

import { eq } from "drizzle-orm"
import { db } from ".."

import { members, workspaces } from "../schema"

export async function getWorkspaceById(id: string) {
  try {
    const workspace = await db.query.workspaces.findFirst({
      where: eq(workspaces.id, id),
    })
    if (!workspace) throw new Error("Workspace not found")
    return { success: workspace }
  } catch (error) {
    console.error(error)
    return { error: "Failed to get workspace" }
  }
}
export async function getWorkspaces(userId: string) {
  try {

    const userMembers = await db.query.members.findMany({
      where: eq(members.userId, userId)
    });

    const workspaceIds = userMembers.map((member) => member.workspaceId).join(",");

    const workspaceList = await db.query.workspaces.findMany({
      where: eq(workspaces.id, workspaceIds),
      with: {
        members: {
          with: {
            user: true,
          },
        },
      },
      orderBy: (workspaceList, { desc }) => [desc(workspaceList.id)],
    });

    if (!workspaceList) throw new Error("Workspace not found")
    return { success: workspaceList }
  } catch (error) {
    console.error(error)
    return { error: "Failed to get workspace" }
  }
}
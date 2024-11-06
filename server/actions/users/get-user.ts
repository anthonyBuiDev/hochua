"use server";
import { db } from "@/server";
import { users } from "@/server/schema";
import { eq } from "drizzle-orm";

export async function getUser(id: string) {
  try {
    const user = await db.query.users.findFirst({
      where: eq(users.id, id),
    });
    if (!user) throw new Error("user  not found");
    return { success: user };
  } catch (error) {
    console.error(error);
    return { error: "Failed to get user " };
  }
}
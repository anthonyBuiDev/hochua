"use server";

import { eq } from "drizzle-orm";
import { db } from "..";
import {
  users,
} from "../schema";



export const newVerification = async (id: string) => {
  const existingUser = await db.query.users.findFirst({
    where: eq(users.id, id),
  })
    ;
  if (!existingUser) return { error: "Người dùng không có" };

  await db.update(users).set({
    emailVerified: new Date(),
  }).where(eq(users.id, id));

  return { success: "Kích hoạt thành công" };
};








"use server"

import { actionClient } from "@/lib/safe-action"
import { SettingsSchema } from "@/types/settings-schema"
import bcrypt from "bcrypt"
import { eq } from "drizzle-orm"

import { revalidatePath } from "next/cache"
import { db } from ".."
import { auth } from "../auth"
import { users } from "../schema"



export const settings = actionClient.schema(SettingsSchema).action(async ({ parsedInput }) => {
  const user = await auth()
  if (!user) {
    return { error: "User not found" }
  }
  const dbUser = await db.query.users.findFirst({
    where: eq(users.id, user?.user?.id ?? ""),
  })

  if (!dbUser) {
    return { error: "User not found" }
  }

  if (user?.user?.isOAuth) {
    parsedInput.email = undefined
    parsedInput.password = undefined
    parsedInput.newPassword = undefined
    parsedInput.isTwoFactorEnabled = undefined
  }

  if (parsedInput.password && parsedInput.newPassword && dbUser.password) {
    const passwordMatch = await bcrypt.compare(parsedInput.password, dbUser.password)
    if (!passwordMatch) {
      return { error: "Password does not match" }
    }
    const samePassword = await bcrypt.compare(
      parsedInput.newPassword,
      dbUser.password
    )
    if (samePassword) {
      return { error: "New password is the same as the old password" }
    }
    const hashedPassword = await bcrypt.hash(parsedInput.newPassword, 10)
    parsedInput.password = hashedPassword
    parsedInput.newPassword = undefined
  }
  const updatedUser = await db
    .update(users)
    .set({
      twoFactorEnabled: parsedInput.isTwoFactorEnabled,
      name: parsedInput.name,
      email: parsedInput.email,
      password: parsedInput.password,
      image: parsedInput.image,
    })
    .where(eq(users.id, dbUser.id))
  revalidatePath("/dashboard/settings")
  return { success: "Settings updated" }
})
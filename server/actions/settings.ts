"use server";

import { actionClient } from "@/lib/safe-action";
import { SettingsSchema } from "@/types/settings-schema";
import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";

import { revalidatePath } from "next/cache";
import { db } from "..";
import { auth } from "../auth";
import { users } from "../schema";

export const settings = actionClient
  .schema(SettingsSchema)
  .action(async ({ parsedInput }) => {
    const user = await auth();
    if (!user) {
      return { error: "Không tìm thấy người dùng" };
    }
    const dbUser = await db.query.users.findFirst({
      where: eq(users.id, user?.user?.id ?? ""),
    });

    if (!dbUser) {
      return { error: "Không tìm thấy người dùng" };
    }

    if (user?.user?.isOAuth) {
      parsedInput.email = undefined;
      parsedInput.password = undefined;
      parsedInput.newPassword = undefined;
    }

    if (parsedInput.password && parsedInput.newPassword && dbUser.password) {
      const passwordMatch = await bcrypt.compare(
        parsedInput.password,
        dbUser.password,
      );
      if (!passwordMatch) {
        return { error: "Mật khẩu không khớp" };
      }
      const samePassword = await bcrypt.compare(
        parsedInput.newPassword,
        dbUser.password,
      );
      if (samePassword) {
        return { error: "Mật khẩu mới không được giống mật khẩu cũ" };
      }
      const hashedPassword = await bcrypt.hash(parsedInput.newPassword, 10);
      parsedInput.password = hashedPassword;
      parsedInput.newPassword = undefined;
    }
    const updatedUser = await db
      .update(users)
      .set({
        name: parsedInput.name,
        email: parsedInput.email,
        password: parsedInput.password,
        image: parsedInput.image,
      })
      .where(eq(users.id, dbUser.id));
    revalidatePath("/dashboard/settings");
    return { success: "Cài đặt đã được lưu" };
  });

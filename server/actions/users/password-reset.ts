"use server";

import { actionClient } from "@/lib/safe-action";
import { db } from "@/server";
import { users } from "@/server/schema";
import { Pool } from "@neondatabase/serverless";
import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/neon-serverless";
import { z } from "zod";


export const reset = actionClient
  .schema(z.object({ id: z.string() }))
  .action(async ({ parsedInput: { id } }) => {
    const pool = new Pool({ connectionString: process.env.POSTGRES_URL });
    const dbPool = drizzle(pool);
    const existingUser = await db.query.users.findFirst({
      where: eq(users.id, id),
    });

    if (!existingUser) {
      return { error: "Không tìm thấy người dùng" };
    }

    const hashedPassword = await bcrypt.hash("pass@123", 10);

    await dbPool.transaction(async (tx) => {
      await tx
        .update(users)
        .set({
          password: hashedPassword,
        })
        .where(eq(users.id, existingUser.id));
    });


    return { success: "Đã cấp lại mật khẩu" };
  });

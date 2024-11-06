"use server";
import { actionClient } from "@/lib/safe-action";
import { RegisterSchema } from "@/types/register-schema";
import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";
import { db } from "..";
import { users } from "../schema";


export const emailRegister = actionClient
  .schema(RegisterSchema)
  .action(async ({ parsedInput: { email, name, password } }) => {
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (existingUser) {
      if (!existingUser.emailVerified) {

        return { success: "Chờ Admin kích hoạt" };
      }
      return { error: "Tài khoản đã có" };
    }


    const isFirstUser = await db.query.users.findMany();
    const role = isFirstUser.length === 0 ? "admin" : "user";

    await db.insert(users).values({
      email,
      name,
      password: hashedPassword,
      roles: role,
    });


    return { success: "Chờ Admin kích hoạt" };
  });

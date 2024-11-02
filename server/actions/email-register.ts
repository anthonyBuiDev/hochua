"use server";
import { actionClient } from "@/lib/safe-action";
import { RegisterSchema } from "@/types/register-schema";
import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";
import { db } from "..";
import { users } from "../schema";
import { sendVerificationEmail } from "./email";
import { generateEmailVerificationToken } from "./tokens";

export const emailRegister = actionClient
  .schema(RegisterSchema)
  .action(async ({ parsedInput: { email, name, password } }) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);
    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (existingUser) {
      if (!existingUser.emailVerified) {
        const verificationToken = await generateEmailVerificationToken(email);
        await sendVerificationEmail(
          verificationToken[0].email,
          verificationToken[0].token,
        );
        return { success: "Email confirmation resent " };
      }
      return { error: "User already exists" };
    }
    //TODO: First user to be admin
    await db.insert(users).values({
      email,
      name,
      password: hashedPassword,
    });

    const verificationToken = await generateEmailVerificationToken(email);

    await sendVerificationEmail(
      verificationToken[0].email,
      verificationToken[0].token,
    );

    return { success: "Confirmation Email Sent!" };
  });

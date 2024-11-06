"use server";
import { actionClient } from "@/lib/safe-action";
import { LoginSchema } from "@/types/login-schema";
import { eq } from "drizzle-orm";
import { AuthError } from "next-auth";

import { db } from "..";
import { signIn } from "../auth";
import { users } from "../schema";


export const SignIn = actionClient
  .schema(LoginSchema)
  .action(async ({ parsedInput: { email, password } }) => {
    try {
      const existingUser = await db.query.users.findFirst({
        where: eq(users.email, email),
      });

      if (existingUser?.email !== email) {
        return { error: "Email not  found" };
      }

      if (!existingUser.emailVerified) {

        return { success: "Chờ admin kích hoạt" };
      }

      await signIn("credentials", {
        email,
        password,
        redirectTo: "/",
      });

      return { success: "User Signed In!" };
    } catch (error) {
      if (error instanceof AuthError) {
        switch (error.type) {
          case "CredentialsSignin":
            return { error: "Email or Password Incorrect" };
          case "AccessDenied":
            return { error: error.message };
          case "OAuthSignInError":
            return { error: error.message };
          default:
            return { error: "Something went wrong" };
        }
      }
      throw error;
    }
  });

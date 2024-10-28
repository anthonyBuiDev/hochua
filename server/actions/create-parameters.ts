"use server"
import { actionClient } from "@/lib/safe-action";
import { ParameterSchema } from "@/types/parameters-schema";

// import { revalidatePath } from "next/cache";
import { db } from "..";
import { parameters } from "../schema";





export const CreateParameter = actionClient.schema(ParameterSchema).action(async ({ parsedInput }) => {
  try {
    const parameter = await db.insert(parameters).values(parsedInput).returning();
    // console.log(parsedInput);
    return parameter;
  } catch (err) {
    return { error: "Failed to create product", err };
  }
});


export const createBulkParameters = actionClient.schema(ParameterSchema).action(async ({ parsedInput }) => {
  try {
    for (const parameter of parsedInput) {
      await CreateParameter(parameter)
    }
    return { success: "Successfully created products" }
  } catch (error) {
    console.log(error)
    return { error: "Failed to create product" };
  }
});
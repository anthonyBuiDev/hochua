"use server";
import { actionClient } from "@/lib/safe-action";
import { db } from "@/server";
import { parameters } from "@/server/schema";
import { ParameterSchema } from "@/types/parameters-schema";

// import { revalidatePath } from "next/cache";
import { revalidatePath } from "next/cache";
import { z } from "zod";


//TODO: make edit parameter schema

export const CreateParameter = actionClient
  .schema(z.array(ParameterSchema))
  .action(async ({ parsedInput }) => {
    try {

      const parameter = await db
        .insert(parameters)
        .values(parsedInput.map((item) => ({
          title: item.title,
          tt: item.tt,
          unit: item.unit,
          value: item.value,
          workspaceId: item.workspaceId,
        })))
        .returning();
      revalidatePath(`/workspace/${parameter[0].workspaceId}/thongso`);
      return { success: `Create parameters`, };
    } catch (err) {
      return { error: "Failed to create parameters", err };
    }
  });


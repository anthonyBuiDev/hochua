"use server";
import { actionClient } from "@/lib/safe-action";
import { db } from "@/server";
import { lakeCharacteristics } from "@/server/schema";
import { LakeCharacteristicSchema } from "@/types/lakeCharacteristics-schema";
import { revalidatePath } from "next/cache";
import { z } from "zod";


//TODO: make edit parameter schema

export const CreateLakeCharacteristics = actionClient
  .schema(z.array(LakeCharacteristicSchema))
  .action(async ({ parsedInput }) => {
    try {
      const characteristics = await db
        .insert(lakeCharacteristics)
        .values(parsedInput.map((item) => ({
          workspaceId: item.workspaceId,
          elevation: item.elevation,
          surfaceArea: item.surfaceArea,
          volume: item.volume,
        })))
        .returning();
      revalidatePath(`/workspace/${characteristics[0].workspaceId}/parameters`);
      return { success: `Create lake characteristics`, };
    } catch (err) {
      return { error: "Failed to create lake characteristics`", err };
    }
  });


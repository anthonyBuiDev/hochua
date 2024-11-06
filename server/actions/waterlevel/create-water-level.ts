"use server";
import { actionClient } from "@/lib/safe-action";
import { db } from "@/server";
import { waterLevels } from "@/server/schema";
import { WaterLevelSchema } from "@/types/water-level-schema";

import { revalidatePath } from "next/cache";
import { z } from "zod";


export const CreateWaterLevel = actionClient
  .schema(z.array(WaterLevelSchema))
  .action(async ({ parsedInput }) => {
    try {
      const waterLevel = await db
        .insert(waterLevels)
        .values(parsedInput.map((item) => ({
          workspaceId: item.workspaceId,
          date: item.date,
          emergencyLevel: item.emergencyLevel,
          limitLevel: item.limitLevel,
        })))
        .returning();
      revalidatePath(`/workspace/${waterLevel[0].workspaceId}/bieudo`);
      return { success: `Thêm thành công`, };
    } catch (err) {
      return { error: "Thêm thất bại", err };
    }
  });


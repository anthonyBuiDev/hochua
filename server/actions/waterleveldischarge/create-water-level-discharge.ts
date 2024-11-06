"use server";
import { actionClient } from "@/lib/safe-action";
import { db } from "@/server";
import { waterLevelDischarges } from "@/server/schema";
import { WaterLevelDischargeSchema } from "@/types/water-level-discharge-schema";

import { revalidatePath } from "next/cache";
import { z } from "zod";



export const CreateWaterLevelDischarge = actionClient
  .schema(z.array(WaterLevelDischargeSchema))
  .action(async ({ parsedInput }) => {
    try {
      // C
      const batchSize = 1000;
      const batches = [];
      for (let i = 0; i < parsedInput.length; i += batchSize) {
        batches.push(parsedInput.slice(i, i + batchSize));
      }


      for (const batch of batches) {
        await db
          .insert(waterLevelDischarges)
          .values(batch.map((item) => ({
            workspaceId: item.workspaceId,
            gateOpening: item.gateOpening,
            type: item.type,
            waterLevel: item.waterLevel,
            dischargeRate: item.dischargeRate,
          })))

      }

      const { workspaceId, type } = parsedInput[0];
      revalidatePath(`/workspace/${workspaceId}/${type}`);

      return { success: `Thêm thành công`, };
    } catch (err) {
      return { error: "Xóa thất bại`", err };
    }
  });


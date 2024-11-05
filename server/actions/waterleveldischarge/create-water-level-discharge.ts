"use server";
import { actionClient } from "@/lib/safe-action";
import { db } from "@/server";
import { waterLevelDischarges } from "@/server/schema";
import { WaterLevelDischargeSchema } from "@/types/water-level-discharge-schema";

import { revalidatePath } from "next/cache";
import { z } from "zod";


//TODO: make edit parameter schema

export const CreateWaterLevelDischarge = actionClient
  .schema(z.array(WaterLevelDischargeSchema))
  .action(async ({ parsedInput }) => {
    try {
      // Chia nhỏ dữ liệu thành từng mảng nhỏ
      const batchSize = 1000; // Kích thước nhóm
      const batches = [];
      for (let i = 0; i < parsedInput.length; i += batchSize) {
        batches.push(parsedInput.slice(i, i + batchSize));
      }

      // Chèn từng nhóm vào cơ sở dữ liệu
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
          .returning();
      }
      // revalidatePath(`/workspace/${waterLevelDischarge[0].workspaceId}/${waterLevelDischarge[0].type}`);
      return { success: `Create Water Level Discharge`, };
    } catch (err) {
      return { error: "Failed to create Water Level Discharge`", err };
    }
  });


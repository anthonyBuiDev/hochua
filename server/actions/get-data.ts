"use sever"

import { and, eq } from "drizzle-orm";
import { db } from "..";
import { lakeCharacteristics, waterLevelDischarges } from "../schema";

export async function getData({ elevation, workspaceId, a1, a2 }: { elevation: string; workspaceId: string, a1: string, a2: string }) {
  try {

    const characteristic = await db.query.lakeCharacteristics.findFirst({
      where: and(eq(lakeCharacteristics.elevation, elevation), eq(lakeCharacteristics.workspaceId, workspaceId)),
    });

    const q1 = await db.query.waterLevelDischarges.findFirst({
      where: and(eq(waterLevelDischarges.gateOpening, a1), eq(lakeCharacteristics.workspaceId, workspaceId), eq(waterLevelDischarges.waterLevel, elevation), eq(waterLevelDischarges.type, "modong")),
    });

    const q2 = await db.query.waterLevelDischarges.findFirst({
      where: and(eq(waterLevelDischarges.gateOpening, a2), eq(lakeCharacteristics.workspaceId, workspaceId), eq(waterLevelDischarges.type, "momo"), eq(waterLevelDischarges.waterLevel, elevation)),
    });

    const data = { characteristic, q1, q2 }

    if (!data) throw new Error("Không tìm thấy");

    return { success: data };

  } catch (error) {

    return { error: "Thất bại" };
  }
}



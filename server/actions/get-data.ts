"use sever"
import { db } from "..";

export async function getData() {
  try {
    const characteristic = await db.query.lakeCharacteristics.findMany()

    const q1 = await db.query.waterLevelDischarges.findMany()

    const q2 = await db.query.waterLevelDischarges.findMany()

    const data = { characteristic, q1, q2 }

    if (!data) throw new Error("Không tìm thấy");

    return { success: data };

  } catch (error) {

    return { error: "Thất bại" };
  }
}



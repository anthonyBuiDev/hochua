"use sever"

import { eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "..";
import { lakeCharacteristics } from "../schema";

export async function getLakeCharacteristic(elevation: string) {
  try {
    const characteristic = await db.query.lakeCharacteristics.findFirst({
      where: eq(lakeCharacteristics.elevation, elevation),
    });

    if (!characteristic) throw new Error("Không tim thấy");

    return { success: true, characteristic };

  } catch (error) {
    console.error(error);
    return { error: "Thất bại " };
  }
}




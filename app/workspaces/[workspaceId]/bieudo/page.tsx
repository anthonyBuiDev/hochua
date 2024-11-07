
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { db } from "@/server";
import { auth } from "@/server/auth";
import { waterLevels } from "@/server/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import Chart from "./chart";
import WaterLevelTable from "./table";
import WaterLevelForm from "./water-level-form";


import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Biểu đồ",
};

export default async function BieuDo({
  params,
}: {
  params: Promise<{ workspaceId: string }>
}) {

  const user = await auth();

  if (!user) {
    redirect("/login");
  }
  const workspaceId = (await params).workspaceId


  const waterLevel = await db.query.waterLevels.findMany({
    where: eq(waterLevels.workspaceId, workspaceId),
  });

  if (!waterLevel) throw new Error("Không tìm thấy thông số");


  const dataTable = waterLevel.map(data => {

    const line3 = data.date === "1/IX" ? 24.2 : data.date === "1/X" ? 24.2 : data.date === "30/X" ? 24.2 : data.date === "30/XI" ? 24.2 : data.date === "31/XII" ? 24.2 : data.date === "31/I" ? 27.3 : null;

    return {
      date: data.date,
      emergencyLevel: data.emergencyLevel,
      limitLevel: data.limitLevel,
      line3,
      mntl: 24.2,
      mnc: 20.2,
      mndbt: 24.2,
      ctdl: 27.7,
      mnlkt: 27.29
    }
  })
  return (
    <div className="w-full lg:max-w-7xl">
      <WaterLevelForm />
      <div className="rounded-md border">
        <Card>
          <CardHeader className="text-center">
            <CardTitle>Biểu đồ điều phối</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-5">
            <Chart data={dataTable} />
            <WaterLevelTable data={waterLevel} />
          </CardContent>
        </Card>
      </div>
    </div >
  )
}


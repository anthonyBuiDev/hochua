

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

  return (
    <div className="w-full lg:max-w-7xl">
      <WaterLevelForm />
      <div className="rounded-md border">
        <Card>
          <CardHeader className="text-center">
            <CardTitle>Biểu đồ điều phối</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-5">
            <Chart data={waterLevel} />
            <WaterLevelTable data={waterLevel} />
          </CardContent>
        </Card>
      </div>
    </div >
  )
}


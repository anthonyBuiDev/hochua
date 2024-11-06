import { db } from "@/server";
import { auth } from "@/server/auth";
import { waterLevelDischarges } from "@/server/schema";
import { and, eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import WaterLevelDischargeForm from "./water-level-discharge-form";
import WaterLevelTable from "./water-level-table";


export default async function modong({
  params,
}: {
  params: Promise<{ workspaceId: string }>
}) {

  const user = await auth();

  if (!user) {
    redirect("/login");
  } const workspaceId = (await params).workspaceId


  const waters = await db.query.waterLevelDischarges.findMany({
    where: and(
      eq(waterLevelDischarges.workspaceId, workspaceId),
      eq(waterLevelDischarges.type, "modong")),
  });

  if (!waters) throw new Error("Không tìm thấy thông số");

  return (
    <div className="w-full lg:max-w-7xl">
      <WaterLevelDischargeForm />
      <WaterLevelTable data={waters} />
    </div>)
}
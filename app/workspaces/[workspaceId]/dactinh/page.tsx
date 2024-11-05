import { db } from "@/server";
import { auth } from "@/server/auth";
import { lakeCharacteristics } from "@/server/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import LakeCharacteristicForm from "./lake-characteristic-form";


export default async function DacTinh({
  params,
}: {
  params: Promise<{ workspaceId: string }>
}) {
  const user = await auth();

  if (!user) {
    redirect("/login");
  } const workspaceId = (await params).workspaceId


  const characteristics = await db.query.lakeCharacteristics.findMany({
    where: eq(lakeCharacteristics.workspaceId, workspaceId),
  });


  if (!characteristics) throw new Error("Không tìm thấy đặc tính");

  return (
    <div className="w-full lg:max-w-7xl">
      <LakeCharacteristicForm />
      <DataTable columns={columns} data={characteristics} />
    </div>
  );
}

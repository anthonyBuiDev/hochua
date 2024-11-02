import { auth } from "@/server/auth";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { db } from "@/server";
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

  if (!characteristics) throw new Error("No parameter found");


  return (
    <div className="w-full lg:max-w-7xl">
      <Dialog>
        <DialogTrigger asChild>
          <Button className="mb-5">Quản lý</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Thêm đặc tính</DialogTitle>
            <div className="flex justify-center items-center">
              <LakeCharacteristicForm />
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <DataTable columns={columns} data={characteristics} />
    </div>
  );
}

import { db } from "@/server";
import { auth } from "@/server/auth";
import { parameters } from "@/server/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { columns } from "./columns";

import ParameterForm from "./parameters-form";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DataTable } from "./data-table";

export default async function ThongSo({
  params,
}: {
  params: Promise<{ workspaceId: string }>
}) {
  const user = await auth();

  if (!user) {
    redirect("/login");
  } const workspaceId = (await params).workspaceId


  const parametersList = await db.query.parameters.findMany({
    where: eq(parameters.workspaceId, workspaceId),
  });

  if (!parametersList) throw new Error("No parameter found");


  return (
    <div className="w-full lg:max-w-7xl">
      <Dialog>
        <DialogTrigger asChild>
          <Button className="mb-5">Quản lý</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Thêm thông số</DialogTitle>
            <div className="flex justify-center items-center">
              <ParameterForm />
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <DataTable columns={columns} data={parametersList} />
    </div>
  );
}

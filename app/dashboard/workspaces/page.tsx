

import { auth } from "@/server/auth";

import { getWorkspaces } from "@/server/actions/get-workspace";

import { Metadata } from "next";
import { redirect } from "next/navigation";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export const metadata: Metadata = {
  title: "Workspaces",
};

export default async function Workspaces() {
  const user = await auth();
  if (!user) {
    redirect("/login");
  }

  const workspaces = await getWorkspaces(user.user?.id);

  if (!workspaces) throw new Error("No workspaces found");

  const dataTable = workspaces?.success?.map((workspace) => {
    if (workspace.members.length === 0) {
      return {
        id: workspace.id,
        name: workspace.name,
        members: [],
      };
    }

    return {
      id: workspace.id,
      name: workspace.name,
      members: workspace.members,

    };
  });


  if (!dataTable) throw new Error("No data found");

  return (
    <div>
      <DataTable columns={columns} data={dataTable} />
    </div >
  );
}

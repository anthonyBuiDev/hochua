import { db } from "@/server";
import { auth } from "@/server/auth";
import { redirect } from "next/navigation";
import { columns } from "./columns";
import { DataTable } from "./data-table";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Hồ chứa",
};

export default async function Workspaces() {
  const user = await auth();

  if (!user) {
    redirect("/login");
  }

  if (user.user?.roles !== "admin") {
    return redirect("/dashboard/settings");
  }

  const workspaces = await db.query.workspaces.findMany({
    with: {
      members: {
        with: {
          user: true,
        },
      },
    },
    orderBy: (workspaces, { desc }) => [desc(workspaces.id)],
  });

  if (!workspaces) throw new Error("Không có hồ chứa");
  const dataTable = workspaces.map((workspace) => {
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

  if (!dataTable) throw new Error("Không có dữ liệu");
  return (
    <div>
      <DataTable columns={columns} data={dataTable} />
    </div>
  );
}

import { db } from "@/server";
import { auth } from "@/server/auth";
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

  if (user.user?.roles !== "admin") {
    return redirect("/dashboard/settings")
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


  if (!workspaces) throw new Error("No workspaces found");
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
  console.log(dataTable)
  if (!dataTable) throw new Error("No data found");
  return (
    <div>
      <DataTable columns={columns} data={dataTable} />
    </div >
  );
}

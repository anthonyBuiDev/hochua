import { db } from "@/server";
import { auth } from "@/server/auth";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export const metadata: Metadata = {
  title: "Người dùng",
};

export default async function Users() {
  const user = await auth();

  if (!user) {
    redirect("/login");
  }

  if (user.user?.roles !== "admin") {
    return redirect("/dashboard/settings");
  }

  const users = await db.query.users.findMany();


  if (!users) throw new Error("Không có người dùng");


  return (
    <div>
      <DataTable columns={columns} data={users} />
    </div>
  );
}

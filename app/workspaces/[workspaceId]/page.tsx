import { auth } from "@/server/auth";
import { redirect } from "next/navigation";
import React from "react";

export default async function WorkspaceIdPage() {
  const user = await auth();

  if (!user) redirect("auth/login");
  return <div>Trang chủ</div>;
}

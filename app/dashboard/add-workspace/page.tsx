import { auth } from "@/server/auth";
import { redirect } from "next/navigation";


import { Metadata } from "next";
import WorkspaceForm from "./workspace-form";

export const metadata: Metadata = {
  title: "Create workspace",
};

export default async function AddWorkspace() {
  const session = await auth();
  if (session?.user.roles !== "admin") return redirect("/dashboard/settings");
  return <WorkspaceForm />;
}

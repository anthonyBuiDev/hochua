import { getWorkspacesByUserId } from "@/server/actions/get-workspace";
import { auth } from "@/server/auth";
import { redirect } from "next/navigation";

const WorkspacePage = async () => {
  const user = await auth();

  if (!user) redirect("auth/login");

  const workspaces = await getWorkspacesByUserId(user.user.id);

  const workspaceId = workspaces.map((workspace) => workspace.id);

  if (workspaces.length === 0) {
    redirect("/dashboard/add-workspace");
  } else {
    redirect(`/workspaces/${workspaceId}`);
  }
};

export default WorkspacePage;

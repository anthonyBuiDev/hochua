import { AppSidebar } from "@/components/navigation/app-sidebar";
import Header from "@/components/navigation/header";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import { getWorkspacesByUserId } from "@/server/actions/get-workspace";
import { auth } from "@/server/auth";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await auth();
  if (!user) redirect("/auth/login");

  const workspaces = await getWorkspacesByUserId(user.user.id);

  if (!workspaces) redirect("/workspaces/add-workspace");


  return (
    <div className="min-h-screen">
      <SidebarProvider>
        <AppSidebar workspaces={workspaces} />
        <SidebarInset>
          <Header />
          <div className="bg-primary-foreground min-h-screen flex flex-col items-center pt-5">
            {children}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}

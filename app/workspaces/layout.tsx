
import { AppSidebar } from "@/components/navigation/app-sidebar";
import Header from "@/components/navigation/header";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import { getWorkspacesByUserId } from "@/server/actions/get-workspace";
import { auth } from "@/server/auth";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children
}: {
  children: React.ReactNode
}) {
  const user = await auth();
  if (!user) redirect("/auth/login");

  const workspaces = await getWorkspacesByUserId(user.user.id)

  // if (!workspaces) redirect("/workspaces/");

  return (
    <SidebarProvider>
      <AppSidebar workspaces={workspaces} />
      <SidebarInset>
        <Header />
        <div className='bg-primary-foreground w-full h-full'>
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

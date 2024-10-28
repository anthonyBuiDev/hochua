
import { AppSidebar } from "@/components/navigation/app-sidebar";
import Header from "@/components/navigation/header";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode
}) {

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Header />
        <div className='bg-primary-foreground w-full h-full'>
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Workspaces } from "@/lib/infer-type";

import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { Check, ChevronsUpDown, GalleryVerticalEnd } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

const allLinks = [
  { label: "Trang Chủ", path: "/" },
  { label: "Thông Số Công Trình", path: "/thongso" },
  { label: "Biểu Đồ Điều Phối", path: "/bieudo" },
  { label: "Vận Hành Hồ Chứa", path: "/vanhanh" },
  { label: "Đặc Tính Lòng Hồ", path: "/dactinh" },
  { label: "Cửa Van Số 1", path: "/modong" },
  { label: "Cửa Van Số 2", path: "/momo" },
];

type workspaceProps = {
  workspaces: Workspaces[];
};

export function AppSidebar({ workspaces }: workspaceProps) {
  const pathname = usePathname();
  const router = useRouter();
  const workspaceId = useWorkspaceId();

  function onSelect(id: string) {
    router.push(`/workspaces/${id}`);
  }

  return (
    <Sidebar>
      <SidebarHeader className="p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex flex-col gap-y-2">
              <div className="flex items-center justify-between">
                <p className="text-xs uppercase font-bold p-1">Hồ Chứa</p>
              </div>
              <Select onValueChange={onSelect} defaultValue={workspaceId}>
                <SelectTrigger className="w-full font-medium p-1" >
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                    <GalleryVerticalEnd className="size-4" />
                  </div>
                  <SelectValue placeholder="Chưa chọn hồ chứa" />
                </SelectTrigger>
                <SelectContent>
                  {workspaces.map((workspace) => (
                    <SelectItem key={workspace.id} value={workspace.id}>{workspace.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="pt-2">
        <SidebarGroup>
          {workspaces.length > 0 && (
            <SidebarGroupContent>
              <SidebarMenu>
                {allLinks.map((link) => (
                  <SidebarMenuItem key={link.path}>
                    <SidebarMenuButton
                      asChild
                      className="py-5 flex font-medium"
                      isActive={`/workspaces/${workspaceId}${link.path}` === pathname}
                    >
                      <Link
                        href={`/workspaces/${workspaceId}${link.path}`}
                      >
                        <span>{link.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          )}
        </SidebarGroup>
      </SidebarContent>
    </Sidebar >
  );
}

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

import { Check, ChevronsUpDown, GalleryVerticalEnd } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";


const allLinks = [
  { label: 'Trang Chủ', path: '/' },
  { label: 'Thông Số Công Trình', path: '/thongso' },
  { label: 'Biểu Đồ Điều Phối', path: '/bieudo' },
  { label: 'Vận Hành Hồ Chứa', path: '/vanhanh' },
  { label: 'Đặc Tính Lòng Hồ', path: '/dactinh' },
  { label: 'Cửa Van Số 1', path: '/modong' },
  { label: 'Cửa Van Số 2', path: '/momo' },
];

type workspaceProps = {
  workspaces: Workspaces[]
}

export function AppSidebar({ workspaces }: workspaceProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [selected, setSelected] = useState<string>(workspaces[0].name);

  function onSelect(id: string) {
    router.push(`/workspaces/${id}`);
  }

  return (
    <Sidebar>
      <SidebarHeader className="p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                    <GalleryVerticalEnd className="size-4" />
                  </div>
                  <div className="flex flex-col gap-0.5 leading-none">
                    <span className="font-semibold">Hồ chứa</span>
                    <span className="">{selected}</span>
                  </div>
                  <ChevronsUpDown className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width]"
                align="start"
              >
                {workspaces.map((workspace) => (
                  <DropdownMenuItem
                    key={workspace.id} onSelect={() => {
                      setSelected(workspace.name)
                      onSelect(workspace.id)
                    }}
                  >
                    {workspace.name}
                    {workspace.name === selected && (
                      <Check className="ml-auto" />
                    )}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="pt-4">
        <SidebarGroup>
          {workspaces.length > 0 && (
            <SidebarGroupContent>
              <SidebarMenu>
                {allLinks.map((link) => (
                  <SidebarMenuItem key={link.path}>
                    <SidebarMenuButton asChild className="p-5 flex font-medium" isActive={link.path === pathname}>
                      <Link href={`/workspaces/${workspaces[0].id}${link.path}`}>
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
    </Sidebar>
  );
}

"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Members } from "@/lib/infer-type";

import { deleteWorkspace } from "@/server/actions/workspaces/delete-workspace";
import { ColumnDef, Row } from "@tanstack/react-table";
import { MoreHorizontal, PlusCircle } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { WorkspaceMembers } from "./workspace-members";

type WorkspaceColumn = {
  name: string;
  members: Members[];
  id: string;
};

const ActionCell = ({ row }: { row: Row<WorkspaceColumn> }) => {
  const { execute } = useAction(deleteWorkspace, {
    onSuccess: (data) => {
      toast.dismiss();
      if (data?.data?.error) {
        toast.error(data.data.error);
      }
      if (data?.data?.success) {
        toast.success(data.data.success);
      }
    },
    onExecute: () => {
      toast.loading("Đang xóa hồ chứa");
    },
  });

  const workspace = row.original;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"ghost"} className="h-8 w-8 p-0">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className="cursor-pointer focus:bg-primary/50 dark:focus:bg-primary">
          <Link href={`/dashboard/add-workspace?id=${workspace.id}`}>
            Sửa hồ chứa
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => execute({ id: workspace.id })}
          className="cursor-pointer focus:bg-destructive/50 dark:focus:bg-destructive"
        >
          Xóa hồ chứa
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export const columns: ColumnDef<WorkspaceColumn>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Tên hồ chứa",
  },
  {
    accessorKey: "members",
    header: "Thành viên",
    cell: ({ row }) => {
      const members = row.getValue("members") as Members[];

      return (
        <div className="flex gap-2">
          {members.map((member) => (
            <div key={member.id}>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <WorkspaceMembers
                      editMode={true}
                      workspaceId={member.workspaceId!}
                      member={member}
                    >
                      <Avatar className="h-7 w-7">
                        {member.user?.image && (
                          <Image
                            src={member.user.image}
                            alt={member.user.name!}
                            fill={true}
                            sizes="100vh"
                          />
                        )}
                        {!member.user?.image && (
                          <AvatarFallback className="bg-primary/25 h-7 w-7">
                            <div className="font-bold">
                              {member.user?.name?.charAt(0).toUpperCase()}
                            </div>
                          </AvatarFallback>
                        )}
                      </Avatar>
                    </WorkspaceMembers>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{member.user?.name}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          ))}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span>
                  <WorkspaceMembers
                    workspaceId={row.original.id}
                    editMode={false}
                  >
                    <PlusCircle className="h-7 w-7" />
                  </WorkspaceMembers>
                </span>
              </TooltipTrigger>
              <TooltipContent>
                <p>Thêm thành viên mới</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "Quản lý",
    cell: ActionCell,
  },
];

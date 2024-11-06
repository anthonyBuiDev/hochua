"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { reset } from "@/server/actions/password-reset";
import { newVerification } from "@/server/actions/tokens";
import { deleteUser } from "@/server/actions/users/delete-user";

import { deleteWorkspace } from "@/server/actions/workspaces/delete-workspace";
import { ColumnDef, Row } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import Link from "next/link";
import { toast } from "sonner";


type UserColumn = {
  name: string | null;
  roles: string | null;
  email: string | null;
  id: string;
  emailVerified: Date | null;
};

const ActionCell = ({ row }: { row: Row<UserColumn> }) => {

  const userAction = useAction(deleteUser, {
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
      toast.loading("Đang xóa người dùng...");
    },
  });

  const { execute } = useAction(reset, {
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
      toast.loading("Cấp lại mật khẩu...");
    },
  });

  const user = row.original;

  const handleActivation = async () => {
    const result = await newVerification(user.id);
    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("Người dùng đã được kích hoạt thành công!");
    }

  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"ghost"} className="h-8 w-8 p-0">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className="cursor-pointer focus:bg-primary/50 dark:focus:bg-primary"
          onClick={handleActivation}
          disabled={user.emailVerified !== null}
        >
          Kích hoạt người dùng
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => execute({ id: user.id })}
          className="cursor-pointer focus:bg-secondary/65 dark:focus:bg-secondary"
        >

          Cấp lại mật khẩu
        </DropdownMenuItem>
        <DropdownMenuItem
          disabled={userAction.status === "executing"}
          onClick={(e) => {
            e.preventDefault();
            userAction.execute({ id: user.id });
          }}
          className="cursor-pointer focus:bg-destructive/50 dark:focus:bg-destructive"
        >
          Xóa Người dùng
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const columns: ColumnDef<UserColumn>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Tên người dùng",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "roles",
    header: "Quyền",
    cell: ({ row }) => {
      const roles = row.getValue("roles") as string;
      return <Badge>{roles}</Badge>
    }
  },
  {
    id: "actions",
    header: "Quản lý",
    cell: ActionCell,
  },
];
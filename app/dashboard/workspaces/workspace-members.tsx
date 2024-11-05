"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Members } from "@/lib/infer-type";

import { getUser } from "@/server/actions/get-user";
import { createEditMember } from "@/server/actions/members/create-edit-member";
import { deleteMember } from "@/server/actions/members/delete-member";
import { MembersSchema } from "@/types/members-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Select } from "@radix-ui/react-select";
import { useAction } from "next-safe-action/hooks";
import { forwardRef, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

type MemberProps = {
  children: React.ReactNode;
  editMode: boolean;
  workspaceId?: string;
  member?: Members;
};

export const WorkspaceMembers = forwardRef<HTMLDivElement, MemberProps>(
  ({ children, editMode, workspaceId, member }, ref) => {
    const form = useForm<z.infer<typeof MembersSchema>>({
      resolver: zodResolver(MembersSchema),
      defaultValues: {
        workspaceRoles: "user",
        editMode,
        id: undefined,
        workspaceId,
        userId: "",
      },
    });

    const [open, setOpen] = useState(false);
    const [userName, setUserName] = useState<string | null>(null);

    const setEdit = () => {
      if (!editMode) {
        form.reset();
        return;
      }
      if (editMode && member) {
        form.setValue("editMode", true);
        form.setValue("id", member.id);
        form.setValue("workspaceId", workspaceId!);
        form.setValue("userId", member.userId!);
        form.setValue("workspaceRoles", member.workspaceRoles!);
      }
    };

    useEffect(() => {
      setEdit();
    }, [member]);

    const { execute, status } = useAction(createEditMember, {
      onExecute() {
        toast.loading("Đang thêm thành viên", { duration: 1 });
        setOpen(false);
      },
      onSuccess(data) {
        toast.dismiss();
        if (data?.data?.error) {
          toast.error(data.data.error);
        }
        if (data?.data?.success) {
          toast.success(data.data.success);
        }
      },
    });

    const memberAction = useAction(deleteMember, {
      onSuccess(data) {
        toast.dismiss();
        if (data?.data?.error) {
          toast.error(data.data.error);
        }
        if (data?.data?.success) {
          toast.success(data.data.success);
        }
      },
      onExecute() {
        toast.loading("Xóa thành viên", { duration: 1 });
        setOpen(false);
      },
    });

    const handleUserIdChange = async (userId: string) => {
      if (userId) {
        const user = await getUser(userId);
        if (user.success) {
          setUserName(user.success.name);
        } else {
          toast.error("Không tìm thấy người dùng!");
        }
      } else {
        setUserName(null);
      }
    };

    function onSubmit(values: z.infer<typeof MembersSchema>) {
      execute(values);
    }

    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>{children}</DialogTrigger>
        <DialogContent className="max-h-[860px] overflow-y-scroll lg:max-w-screen-lg">
          <DialogHeader>
            <DialogTitle>
              {editMode ? "Sửa" : "Thêm"} Thành Viên cho Hồ chứa
            </DialogTitle>
            <DialogDescription>
              Quản lý thành viên cho hồ chứa
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="userId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ID Người dùng</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Id của người dùng"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          handleUserIdChange(e.target.value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {userName && (
                <FormItem>
                  <FormLabel>Tên thành viên</FormLabel>
                  <FormControl>
                    <Input value={userName} readOnly />
                  </FormControl>
                </FormItem>
              )}
              <FormField
                control={form.control}
                name="workspaceRoles"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quyền</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn quyền cho thành viên" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="user">user</SelectItem>
                        <SelectItem value="editor">editor</SelectItem>
                        <SelectItem value="admin">admin</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex items-center justify-center gap-4">
                {editMode && member && (
                  <Button
                    variant={"destructive"}
                    type="button"
                    disabled={memberAction.status === "executing"}
                    onClick={(e) => {
                      e.preventDefault();
                      memberAction.execute({ id: member.id });
                    }}
                  >
                    Xóa thành viên
                  </Button>
                )}
                <Button
                  disabled={
                    status === "executing" ||
                    !form.formState.isValid ||
                    !form.formState.isDirty
                  }
                  type="submit"
                >
                  {editMode ? "Sửa thành viên" : "Thêm thành viên"}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    );
  },
);

WorkspaceMembers.displayName = "WorkspaceMember";

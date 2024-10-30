"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,

  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,

  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createEditWorkspace } from "@/server/actions/create-edit-workspace";
import { getWorkspaceById } from "@/server/actions/get-workspace";
import { WorkspacesSchema, zWorkspacesSchema } from "@/types/workspaces-schema";


import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function WorkspaceForm() {
  const form = useForm<zWorkspacesSchema>({
    resolver: zodResolver(WorkspacesSchema),
    defaultValues: {
      name: "",
    },
    mode: "onChange",
  });

  const router = useRouter();
  const searchParams = useSearchParams();
  const editMode = searchParams.get("id");

  const checkWorkspace = async (id: string) => {
    if (editMode) {
      const data = await getWorkspaceById(id);
      if (data.error) {
        toast.error(data.error);
        router.push("/dashboard/Workspaces");
        return;
      }
      if (data.success) {
        const id = editMode;
        form.setValue("name", data.success.name);
        form.setValue("id", id);
      }
    }
  };

  useEffect(() => {
    if (editMode) {
      checkWorkspace(editMode);
    }
  }, []);

  const { execute, status } = useAction(createEditWorkspace, {
    onSuccess: (data) => {
      toast.dismiss();
      if (data?.data?.error) {
        toast.error(data.data.error);
      }
      if (data?.data?.success) {
        router.push("/dashboard/workspaces");
        toast.success(data.data.success);
      }
    },
    onExecute: () => {
      if (editMode) {
        toast.loading("Editing Workspace");
      }
      if (!editMode) {
        toast.loading("Creating Workspace");
      }
    },
  });

  async function onSubmit(values: zWorkspacesSchema) {
    execute(values);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{editMode ? "Sửa hồ chứa" : "Tạo Hồ Chứa"}</CardTitle>
        <CardDescription>
          {editMode
            ? "Sửa tên hồ chứa"
            : "Tạo hồ chứa mới"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên Hồ chứa:</FormLabel>
                  <FormControl>
                    <Input  {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className="w-full"
              disabled={
                status === "executing" ||
                !form.formState.isValid ||
                !form.formState.isDirty
              }
              type="submit"
            >
              {editMode ? "Lưu" : "Tạo"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

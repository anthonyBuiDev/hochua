"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
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
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { CreateParameter } from "@/server/actions/parameters/create-parameters";
import { deleteParameter } from "@/server/actions/parameters/delete-parameter";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";

import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as XLSX from "xlsx";
import { z } from "zod";

const schema = z.object({
  file: z.any().optional(),
});


export default function ParameterForm() {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      file: undefined,
    },
  });
  const workspaceId = useWorkspaceId();
  const [open, setOpen] = useState(false);


  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onload = (e) => {
        const binaryStr = e.target?.result;
        if (binaryStr) {
          const workbook = XLSX.read(binaryStr, { type: "array" });
          const firstSheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[firstSheetName];
          const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: "" });
          const parameters = jsonData.map((row: any) => ({
            tt: String(row["TT"]),
            title: String(row["THÔNG SỐ"]),
            unit: String(row["ĐƠN VỊ"]),
            value: String(row["TRỊ SỐ"]),
            workspaceId: workspaceId,
          }));

          form.setValue("file", parameters);
        }
      };
    }
  };

  const { execute, status } = useAction(CreateParameter, {
    onSuccess: (data) => {
      if (data?.data?.success) {
        toast.success(data.data.success);
      }
      if (data?.data?.error) {
        toast.error(data.data.error);
      }
    },
    onExecute: (data) => {
      toast.loading("Đang thêm...", { duration: 1 });
      setOpen(false);
    },
  });

  const parameterAction = useAction(deleteParameter, {
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
      toast.loading("Đang xóa...", { duration: 1 });
      setOpen(false);
    },
  });

  function onSubmit(values: z.infer<typeof schema>) {
    const parameters = values.file;
    execute(parameters);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="mb-5">Quản lý</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Quản lý thông số</DialogTitle>
          <DialogDescription> Thêm hoặc xóa thông số </DialogDescription>
        </DialogHeader>
        <div className="flex justify-center items-center">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-2/3 space-y-6 flex flex-col  gap-2 "
            >
              <FormField
                control={form.control}
                name="file"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Chọn file Excel</FormLabel>
                    <FormControl>
                      <Input
                        id="file"
                        type="file"
                        accept=".xlsx, .xls"
                        onChange={(event) => {
                          handleFileChange(event);
                          field.onChange(event);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex items-center justify-center gap-4">
                <Button
                  variant={"destructive"}
                  type="button"
                  disabled={parameterAction.status === "executing"}
                  onClick={(e) => {
                    e.preventDefault();
                    parameterAction.execute({ id: workspaceId });
                  }}
                >
                  Xóa thông số
                </Button>
                <Button
                  disabled={
                    status === "executing" ||
                    !form.formState.isValid ||
                    !form.formState.isDirty
                  }
                  type="submit"
                >
                  Thêm thông số
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>

  );
}

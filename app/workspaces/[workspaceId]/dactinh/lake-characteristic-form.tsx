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
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { CreateLakeCharacteristics } from "@/server/actions/lakeCharacteristics/create-lake-characteristics";
import { deleteLakeCharacteristics } from "@/server/actions/lakeCharacteristics/delete-lake-characteristics";

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


export default function LakeCharacteristicForm() {
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
          const characteristics = jsonData.map((row: any) => ({
            elevation: String(row["Cao trình Z (m)"]),
            surfaceArea: String(row["Diện tích mặt hồ F (ha)"]),
            volume: String(row["Dung tích hồ V (106m³)"]),
            workspaceId: workspaceId,
          }));

          form.setValue("file", characteristics);
        }
      };
    }
  };

  const { execute, status } = useAction(CreateLakeCharacteristics, {
    onSuccess: (data) => {
      toast.dismiss();
      if (data?.data?.success) {
        toast.success(data.data.success);
      }
      if (data?.data?.error) {
        toast.error(data.data.error);
      }
    },
    onExecute: (data) => {
      setOpen(false);
      toast.loading("Đang thêm...", { duration: 1 });
    },
  });

  const lakeCharacteristicAction = useAction(deleteLakeCharacteristics, {
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
      setOpen(false);
      toast.loading("Đang xóa...", { duration: 1 });

    },
  });

  function onSubmit(values: z.infer<typeof schema>) {
    const characteristics = values.file;
    execute(characteristics);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="mb-5">Quản lý</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Thêm đặc tính</DialogTitle>
          <DialogDescription>Thêm hoặc xóa đặc tính</DialogDescription>
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
                  disabled={lakeCharacteristicAction.status === "executing"}
                  onClick={(e) => {
                    e.preventDefault();
                    lakeCharacteristicAction.execute({ id: workspaceId });
                  }}
                >
                  Xóa đặc tính hồ
                </Button>
                <Button
                  disabled={
                    status === "executing" ||
                    !form.formState.isValid ||
                    !form.formState.isDirty
                  }
                  type="submit"
                >
                  Thêm đặc tính hồ
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>

  );
}

"use client";
import { Button } from "@/components/ui/button";
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

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CreateWaterLevel } from "@/server/actions/waterlevel/create-water-level";
import { deleteWaterLevel } from "@/server/actions/waterlevel/delete-water-level";
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


export default function WaterLevelForm() {
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
          const jsonData = XLSX.utils.sheet_to_json<Record<string, any>>(worksheet, { defval: "" });
          const dateColumns = [
            "31/III", "30/IV", "31/V", "30/VI", "31/VII",
            "31/VIII", "1/IX", "1/X", "31/X", "30/XI", "31/XII", "31/I", "28/II"
          ];

          const waterLevels: { date: string; limitLevel: string; emergencyLevel: string; workspaceId: string }[] = [];
          dateColumns.forEach((date) => {
            const limitLevelRow = jsonData.find((row: Record<string, any>) => row["Ngày/ Tháng"] === "Đường hạn chế cấp nước");
            const emergencyLevelRow = jsonData.find((row: Record<string, any>) => row["Ngày/ Tháng"] === "Đường phòng phá hoại");
            const limitLevel = limitLevelRow ? String(limitLevelRow[date] || "") : "";
            const emergencyLevel = emergencyLevelRow ? String(emergencyLevelRow[date] || "") : "";
            waterLevels.push({
              date,
              limitLevel,
              emergencyLevel,
              workspaceId,
            });
          });

          form.setValue("file", waterLevels);
        }
      };
    }
  };

  const { execute, status } = useAction(CreateWaterLevel, {
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
      toast.loading("Đang thêm thông số", { duration: 1 });
      setOpen(false);
    },
  });

  const waterLevelAction = useAction(deleteWaterLevel, {
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
      toast.loading("Xóa thông số", { duration: 1 });

    },
  });

  function onSubmit(values: z.infer<typeof schema>) {
    const waterLevels = values.file;
    execute(waterLevels);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="mb-5">Quản lý</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Quản lý biểu đồ</DialogTitle>
          <DialogDescription>Thêm hoặc xóa thông số</DialogDescription>
        </DialogHeader>
        <div className="flex justify-center items-center">
          < Form {...form}>
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
                  disabled={waterLevelAction.status === "executing"}
                  onClick={(e) => {
                    e.preventDefault();
                    waterLevelAction.execute({ id: workspaceId });
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
    </Dialog >
  );
}

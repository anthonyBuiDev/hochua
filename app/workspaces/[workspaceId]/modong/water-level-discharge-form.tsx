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
  DialogTrigger
} from "@/components/ui/dialog";
import { CreateWaterLevelDischarge } from "@/server/actions/waterleveldischarge/create-water-level-discharge";
import { deleteWaterLevelDischarge } from "@/server/actions/waterleveldischarge/delete-water-level-discharge";

import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { usePathname } from "next/navigation";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as XLSX from "xlsx";
import { z } from "zod";

const schema = z.object({
  file: z.any().optional(),
});
interface WaterLevelDischarges {
  type: string | undefined;
  workspaceId: string | null;
  waterLevel: string | null;
  gateOpening: string | null;
  dischargeRate: string | null;
}

export default function WaterLevelDischargeForm() {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      file: undefined,
    },
  });
  const workspaceId = useWorkspaceId();
  const [open, setOpen] = useState(false);

  const pathname = usePathname()
  const type = pathname.split('/').pop();

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
          const jsonData: any[] = XLSX.utils.sheet_to_json(worksheet, { defval: "" });
          const waterLevelDischarges: WaterLevelDischarges[] = [];


          jsonData.forEach((row) => {
            const waterLevel = String(row['MNTL/a']);


            Object.keys(row).forEach((key) => {
              if (key !== 'MNTL/a') {
                const gateOpening = String(key);
                const dischargeRate = String(row[key]);

                waterLevelDischarges.push({
                  waterLevel,
                  gateOpening,
                  dischargeRate,
                  workspaceId,
                  type
                });
              }
            });
          });

          form.setValue("file", waterLevelDischarges);

        }
      };
    }
  };

  const { execute, status } = useAction(CreateWaterLevelDischarge, {
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

  const waterLevelDischargeAction = useAction(deleteWaterLevelDischarge, {
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
    const waterLevelDischarges = values.file;
    execute(waterLevelDischarges);
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
                  disabled={waterLevelDischargeAction.status === "executing"}
                  onClick={(e) => {
                    e.preventDefault();
                    waterLevelDischargeAction.execute({ id: workspaceId });
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

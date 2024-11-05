"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { getLakeCharacteristic } from "@/server/actions/get-lake-characteristic";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  elevation: z.string(),
  surfaceArea: z.string().optional(),
  volume: z.string().min(0).optional(),
});

export default function InputForm() {
  const [data, setData] = useState<any | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      elevation: "",
      surfaceArea: "",
      volume: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const result = await getLakeCharacteristic(values.elevation);

    if (result.success) {
      form.setValue("surfaceArea", result?.characteristic?.surfaceArea!);
      form.setValue("volume", result?.characteristic?.volume!);
    } else {
      // console.error(result.error);
      // alert("Không tìm thấy dữ liệu cho mực nước đã nhập.");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-7xl mx-auto p-4">
        <div className="flex flex-col md:flex-row gap-6 mb-6">
          {/* Reservoir Parameters */}
          <Card className="flex-1">
            <CardHeader className="bg-[#E6D5A7] border-b">
              <CardTitle className="text-center text-blue-900 font-bold">THÔNG SỐ HỒ CHỨA</CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-4">
              <FormField
                control={form.control}
                name="elevation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>1. Mực nước hồ hiện tại (Zht)</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" className="text-red-600" />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="surfaceArea"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>2. Diện tích mặt nước (Fht)</FormLabel>
                    <FormControl>
                      <div className="h-10 px-3 py-2 rounded-md border border-input bg-background text-sm ring-offset-background">
                        {field.value || "Không có dữ liệu"}
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="volume"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>3. Dung tích hồ hiện tại (Wht)</FormLabel>
                    <FormControl>
                      <div className="h-10 px-3 py-2 rounded-md border border-input bg-background text-sm ring-offset-background">
                        {field.value || "Không có dữ liệu"}
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
        </div>
        <Button type="submit" className="mt-4">Submit</Button>
      </form>
    </Form>
  );
}

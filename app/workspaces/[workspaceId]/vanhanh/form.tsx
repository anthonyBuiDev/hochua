"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { getLakeCharacteristic } from "@/server/actions/get-lake-characteristic";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  elevation: z.string(),
})

export default function Forms() {
  const [surfaceArea, setSurfaceArea] = useState<string | null>(null)
  const [volume, setVolume] = useState<number | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      elevation: "",
    },
  })

  // Fetch lake characteristics when elevation changes
  useEffect(() => {
    const elevation = form.watch("elevation")
    if (elevation) {
      getLakeCharacteristic(elevation).then((response) => {
        if (response.success) {
          setSurfaceArea(response.success.surfaceArea)
          setVolume(response.success?.volume!)
        } else {
          setSurfaceArea(null)
          setVolume(null)
        }
      })
    }
  }, [form.watch("elevation")])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(() => { })} className="w-full max-w-7xl mx-auto p-4">
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
            <FormItem>
              <FormLabel>2. Diện tích mặt nước (Fht)</FormLabel>
              <FormControl>
                <div className="h-10 px-3 py-2 rounded-md border border-input bg-background text-sm ring-offset-background">
                  {surfaceArea || "Không tìm thấy"}
                </div>
              </FormControl>
            </FormItem>
            <FormItem>
              <FormLabel>3. Dung tích hồ hiện tại (Wht)</FormLabel>
              <FormControl>
                <div className="h-10 px-3 py-2 rounded-md border border-input bg-background text-sm ring-offset-background">
                  {volume !== null ? volume : "Không tìm thấy"}
                </div>
              </FormControl>
            </FormItem>
          </CardContent>
        </Card>
        <Button type="submit" className="w-full mt-4">Submit</Button>
      </form>
    </Form>
  )
}

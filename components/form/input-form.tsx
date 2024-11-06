'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'


type DischargeRateData = {
  dischargeRate: string | null;
  waterLevel: string | null;
  gateOpening: string | null;
};

type LakeCharacteristicData = {
  elevation: string | null;
  surfaceArea: string | null;
  volume: string | null;
};


interface InputFormProps {
  q1: DischargeRateData;
  q2: DischargeRateData;
  characteristic: LakeCharacteristicData;
}


const formSchema = z.object({
  elevation: z.string(),
  surfaceArea: z.string().optional(),
  volume: z.string().optional(),
  q_required: z.string().optional(),
  a1_open: z.string().optional(),
  a2_open: z.string().optional(),
  a1: z.string(),
  a2: z.string(),
  q1: z.string().optional(),
  q2: z.string().optional(),
  sumQ: z.string().optional()

})


export default function InputForm({ q1, q2, characteristic }: InputFormProps) {

  const router = useRouter()
  const searchParams = useSearchParams()


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      elevation: searchParams?.get('elevation') || '',
      a1: searchParams?.get('a1') || '',
      a2: searchParams?.get('a2') || '',
    },
  })

  const createQueryString = useCallback(
    (params: Record<string, string>) => {
      const newSearchParams = new URLSearchParams(searchParams?.toString())

      Object.entries(params).forEach(([key, value]) => {
        newSearchParams.set(key, value)
      })

      return newSearchParams.toString()
    },
    [searchParams]
  )

  function onSubmit(values: z.infer<typeof formSchema>) {
    const { elevation, a1, a2 } = values;
    router.push(`?${createQueryString({ elevation, a1, a2 })}`)
  }
  const sumQ = (q1?.dischargeRate && q2?.dischargeRate) ? (parseFloat(q1?.dischargeRate) + parseFloat(q2?.dischargeRate)).toString() : "Không có dữ liệu";


  return (

    <div className="flex justify-center items-center">

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-7xl mx-auto p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-center py-2">THÔNG SỐ HỒ CHỨA</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="elevation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>1. Mực nước hồ hiện tại (Zht)</FormLabel>
                      <FormControl>
                        <Input {...field} className="dark:bg-gray-700 dark:text-white" />
                      </FormControl>
                      <FormDescription>Đơn vị: m</FormDescription>
                      <FormMessage />
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
                        <Input
                          {...field}
                          readOnly
                          className="bg-gray-100 dark:bg-gray-600"
                          defaultValue={characteristic?.surfaceArea || "Không có dữ liệu"}
                        />
                      </FormControl>
                      <FormDescription>Đơn vị: ha</FormDescription>
                      <FormMessage />
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
                        <Input
                          {...field}
                          readOnly
                          className="bg-gray-100 dark:bg-gray-600"
                          defaultValue={characteristic?.volume || "Không có dữ liệu"}
                        />
                      </FormControl>
                      <FormDescription>Đơn vị: 106 m3</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
            <Card className="dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-center py-2">XÁC ĐỊNH ĐỘ MỞ CỬA VAN TRÀN XẢ LŨ</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="q_required"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>1. Lưu lượng cần xả</FormLabel>
                      <FormControl>
                        <Input {...field} className="dark:bg-gray-700 dark:text-white" />
                      </FormControl>
                      <FormDescription>Đơn vị: m3/s</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="a1_open"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>2. Độ mở cửa van số 1 (a1)</FormLabel>
                      <FormControl>
                        <Input {...field} readOnly className="bg-gray-100 dark:bg-gray-600" />
                      </FormControl>
                      <FormDescription>Đơn vị: m</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="a2_open"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>3. Độ mở cửa van số 2 (a2)</FormLabel>
                      <FormControl>
                        <Input {...field} readOnly className="bg-gray-100 dark:bg-gray-600" />
                      </FormControl>
                      <FormDescription>Đơn vị: m</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Card className="dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-center py-2">XÁC ĐỊNH LƯU LƯỢNG XẢ QUA TRÀN</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="a1"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>1. Độ mở cửa van số 1 (a1)</FormLabel>
                      <FormControl>
                        <Input {...field} className="dark:bg-gray-700 dark:text-white" />
                      </FormControl>
                      <FormDescription>Đơn vị: m</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="a2"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>2. Độ mở cửa van số 2 (a2)</FormLabel>
                      <FormControl>
                        <Input {...field} className="dark:bg-gray-700 dark:text-white" />
                      </FormControl>
                      <FormDescription>Đơn vị: m</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="q1"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>3. Lưu lượng xả qua cửa số 1 (Q1)</FormLabel>
                      <FormControl>
                        <Input {...field} readOnly className="bg-gray-100 dark:bg-gray-600" defaultValue={q1?.dischargeRate || "Không có dữ liệu"} />
                      </FormControl>
                      <FormDescription>Đơn vị: m3/s</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="q2"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>4. Lưu lượng xả qua cửa số 2 (Q2)</FormLabel>
                      <FormControl>
                        <Input {...field} readOnly className="bg-gray-100 dark:bg-gray-600" defaultValue={q2?.dischargeRate || "Không có dữ liệu"} />
                      </FormControl>
                      <FormDescription>Đơn vị: m3/s</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="sumQ"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>5. Tổng lượng xả qua tràn (Q1+Q2)</FormLabel>
                      <FormControl>
                        <Input {...field} readOnly className="bg-gray-100 dark:bg-gray-600" defaultValue={sumQ} />
                      </FormControl>
                      <FormDescription>Đơn vị: m3/s</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-center">
            <Button type="submit" size="lg">
              Cập nhật thông số
            </Button>
          </div>
        </form>
      </Form>
    </div>

  )
}
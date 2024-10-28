'use client';


import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
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
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
  heightZ: z.string().min(1, { message: "Mực nước hồ hiện tại không được để trống" }),
  acreageF: z.string().optional(),
  capacityV: z.string().optional(),
  // luuluong: z.string().min(1, { message: "Lưu lượng cần xả không được để trống" }),
  luuluong: z.string().optional(),
  domovan1: z.string().optional(),
  domovan2: z.string().optional(),
  a1: z.string().min(1, { message: "Độ mở cửa van số 1 không được để trống" }),
  a2: z.string().min(1, { message: "Độ mở cửa van số 2 không được để trống" }),
  luuluong1: z.string().optional(),
  luuluong2: z.string().optional(),
  tongluuluong: z.string().optional(),
});

export function InputForm() {
  const [lakeResult, setLakeResult] = useState({ F: null, V: null });
  const [vanResult, setVanResult] = useState({ q1: null, q2: null, sum: null });


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      heightZ: '',
      luuluong: '',
      a1: '',
      a2: '',
    },
  });


  async function onSubmit(values: z.infer<typeof formSchema>) {

    try {
      const response = await fetch('http://localhost:5555/api/v1/calculation-lake/calculator', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          heightZ: parseFloat(values.heightZ),

        }),
      });

      if (!response.ok) {
        throw new Error('Có lỗi xảy ra trong quá trình tính toán');
      }

      const lakeData = await response.json();

      setLakeResult({ F: lakeData.F, V: lakeData.V });

      const vanResponse = await fetch('http://localhost:5555/api/v1/van-opening/calculator', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          heightZ: parseFloat(values.heightZ),
          a1: parseFloat(values.a1),
          a2: parseFloat(values.a2),
        }),
      });

      if (!vanResponse.ok) {
        throw new Error('Có lỗi xảy ra trong quá trình tính toán từ van-opening');
      }

      const vanData = await vanResponse.json();
      console.log(vanData)
      setVanResult({ q1: vanData.q1, q2: vanData.q2, sum: vanData.sum })
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Form {...form} >
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>THÔNG SỐ HỒ CHỨA</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="heightZ"
                render={({ field }) => (
                  <FormItem >
                    <div className='flex justify-center items-center gap-1 '>
                      <FormLabel className="w-1/2">Mực nước hồ hiện tại</FormLabel>
                      <FormControl className="w-1/2">
                        <Input placeholder="" {...field} />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="acreageF"
                render={() => (
                  <FormItem>
                    <div className='flex justify-center items-center gap-1'>
                      <FormLabel className="w-1/2">Diện tích mặt nước</FormLabel>
                      <div className="w-1/2 p-2 border rounded-md">
                        {lakeResult.F !== null ? lakeResult.F : "Chưa có dữ liệu"}
                      </div>
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="capacityV"
                render={() => (
                  <FormItem>
                    <div className='flex justify-center items-center gap-2'>
                      <FormLabel className="w-1/2">Dung tích hồ hiện tại</FormLabel>
                      <div className="w-1/2 p-2 border rounded-md">
                        {lakeResult.V !== null ? lakeResult.V : "Chưa có dữ liệu"}
                      </div>
                    </div>
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>XÁC ĐỊNH ĐỘ MỞ CỬA VAN TRÀN XẢ LŨ</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="luuluong"
                render={({ field }) => (
                  <FormItem >
                    <div className='flex justify-center items-center gap-1 '>
                      <FormLabel className="w-1/2">Lưu lượng cần xả</FormLabel>
                      <FormControl className="w-1/2">
                        <Input placeholder="" {...field} />
                      </FormControl>
                    </div>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="domovan1"
                render={({ field }) => (
                  <FormItem>
                    <div className='flex justify-center items-center gap-1 '>
                      <FormLabel className="w-1/2">Độ mở cửa van số 1</FormLabel>
                      <FormControl className="w-1/2">
                        <Input  {...field} readOnly />
                      </FormControl>
                    </div>

                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="domovan2"
                render={({ field }) => (
                  <FormItem >
                    <div className='flex justify-center items-center gap-2' >
                      <FormLabel className="w-1/2">Độ mở cửa van số 2</FormLabel>
                      <FormControl className="w-1/2">
                        <Input  {...field} readOnly />
                      </FormControl  >
                    </div>
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>XÁC ĐỊNH LƯU LƯỢNG XẢ QUA TRÀN</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="a1"
                render={({ field }) => (
                  <FormItem >
                    <div className='flex justify-center items-center gap-1 '>
                      <FormLabel className="w-1/2">Độ mở cửa van số 1</FormLabel>
                      <FormControl className="w-1/2">
                        <Input placeholder="" {...field} />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="a2"
                render={({ field }) => (
                  <FormItem >
                    <div className='flex justify-center items-center gap-1 '>
                      <FormLabel className="w-1/2">Độ mở cửa van số 2</FormLabel>
                      <FormControl className="w-1/2">
                        <Input placeholder="" {...field} />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="capacityV"
                render={() => (
                  <FormItem>
                    <div className='flex justify-center items-center gap-2'>
                      <FormLabel className="w-1/2">Lưu lượng xả qua cửa số 1</FormLabel>
                      <div className="w-1/2 p-2 border rounded-md">
                        {vanResult.q1 !== null ? vanResult.q1 : "Chưa có dữ liệu"}
                      </div>
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="capacityV"
                render={() => (
                  <FormItem>
                    <div className='flex justify-center items-center gap-2'>
                      <FormLabel className="w-1/2">Lưu lượng xả qua cửa số 2</FormLabel>
                      <div className="w-1/2 p-2 border rounded-md">
                        {vanResult.q2 !== null ? vanResult.q2 : "Chưa có dữ liệu"}
                      </div>
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="capacityV"
                render={() => (
                  <FormItem>
                    <div className='flex justify-center items-center gap-2'>
                      <FormLabel className="w-1/2">Tổng lượng xả qua tràn</FormLabel>
                      <div className="w-1/2 p-2 border rounded-md">
                        {vanResult.sum !== null ? vanResult.sum : "Chưa có dữ liệu"}
                      </div>
                    </div>
                  </FormItem>
                )}
              />

            </CardContent>
          </Card>
        </div>
        <div className="flex justify-end mt-4">
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  );
}

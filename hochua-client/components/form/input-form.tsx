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
import { useForm } from 'react-hook-form';
import { z } from 'zod';
const formSchema = z.object({
  mucnuoc: z.string().min(1, { message: "Mực nước hồ hiện tại không được để trống" }),
  dientich: z.string().optional(),
  dungtich: z.string().optional(),
  luuluong: z.string().min(1, { message: "Lưu lượng cần xả không được để trống" }),
  domovan1: z.string().optional(),
  domovan2: z.string().optional(),
  movan1: z.string().min(1, { message: "Độ mở cửa van số 1 không được để trống" }),
  movan2: z.string().min(1, { message: "Độ mở cửa van số 2 không được để trống" }),
  luuluong1: z.string().optional(),
  luuluong2: z.string().optional(),
  tongluuluong: z.string().optional(),
});

export function InputForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      mucnuoc: '',
      luuluong: '',
      movan1: '',
      movan2: '',
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-1">
        <Card>
          <CardHeader>
            <CardTitle>THÔNG SỐ HỒ CHỨA</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="mucnuoc"
              render={({ field }) => (
                <FormItem >
                  <div className='flex justify-center items-center gap-1 '>
                    <FormLabel className="w-1/3">Mực nước hồ hiện tại</FormLabel>
                    <FormControl className="w-2/3">
                      <Input placeholder="shadcn" {...field} />
                    </FormControl>
                  </div>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dientich"
              render={({ field }) => (
                <FormItem>
                  <div className='flex justify-center items-center gap-1 '>
                    <FormLabel className="w-1/3">Diện tích mặt nước</FormLabel>
                    <FormControl className="w-2/3">
                      <Input  {...field} readOnly />
                    </FormControl>
                  </div>

                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dungtich"
              render={({ field }) => (
                <FormItem >
                  <div className='flex justify-center items-center gap-2' >
                    <FormLabel className="w-1/3">Dung tích hồ hiện tại</FormLabel>
                    <FormControl className="w-2/3">
                      <Input  {...field} readOnly />
                    </FormControl  >
                  </div>
                </FormItem>
              )}
            />
          </CardContent>
        </Card>;
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
                    <FormLabel className="w-1/3">Lưu lượng cần xả</FormLabel>
                    <FormControl className="w-2/3">
                      <Input placeholder="shadcn" {...field} />
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
                    <FormLabel className="w-1/3">Độ mở cửa van số 1</FormLabel>
                    <FormControl className="w-2/3">
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
                    <FormLabel className="w-1/3">Độ mở cửa van số 2</FormLabel>
                    <FormControl className="w-2/3">
                      <Input  {...field} readOnly />
                    </FormControl  >
                  </div>
                </FormItem>
              )}
            />
          </CardContent>
        </Card>;
        <Card>
          <CardHeader>
            <CardTitle>XÁC ĐỊNH LƯU LƯỢNG XẢ QUA TRÀN</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="movan1"
              render={({ field }) => (
                <FormItem >
                  <div className='flex justify-center items-center gap-1 '>
                    <FormLabel className="w-1/3">Độ mở cửa van số 1</FormLabel>
                    <FormControl className="w-2/3">
                      <Input placeholder="shadcn" {...field} />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="movan2"
              render={({ field }) => (
                <FormItem >
                  <div className='flex justify-center items-center gap-1 '>
                    <FormLabel className="w-1/3">Độ mở cửa van số 2</FormLabel>
                    <FormControl className="w-2/3">
                      <Input placeholder="shadcn" {...field} />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="luuluong1"
              render={({ field }) => (
                <FormItem>
                  <div className='flex justify-center items-center gap-1 '>
                    <FormLabel className="w-1/3">Lưu lượng xả qua cửa số 1</FormLabel>
                    <FormControl className="w-2/3">
                      <Input  {...field} readOnly />
                    </FormControl>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="luuluong2"
              render={({ field }) => (
                <FormItem >
                  <div className='flex justify-center items-center gap-2' >
                    <FormLabel className="w-1/3">Lưu lượng xả qua cửa số 2</FormLabel>
                    <FormControl className="w-2/3">
                      <Input  {...field} readOnly />
                    </FormControl  >
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tongluuluong"
              render={({ field }) => (
                <FormItem >
                  <div className='flex justify-center items-center gap-2' >
                    <FormLabel className="w-1/3">Tổng lượng xả qua tràn</FormLabel>
                    <FormControl className="w-2/3">
                      <Input  {...field} readOnly />
                    </FormControl  >
                  </div>
                </FormItem>
              )}
            />
          </CardContent>
        </Card>;

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

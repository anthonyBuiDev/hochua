"use client";
import { cn } from "@/lib/utils";
import { Register } from "@/server/actions/register";
import { RegisterSchema } from "@/types/register-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { AuthCard } from "./auth-card";
import { FormError } from "./form-error";
import { FormSuccess } from "./form-success";
export const RegisterForm = () => {
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { execute, status } = useAction(Register, {
    onSuccess(data) {
      if (data?.data?.error) setError(data.data.error);
      if (data?.data?.success) setSuccess(data.data.success);
    },
  });

  const handleForgotPassword = () => {
    setError("Liên hệ admin cấp lại mật khẩu");
  };

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setError("");
    execute(values);
  };

  return (
    <AuthCard
      cardTitle="Tạo tài khoản mới"
      backButtonHref="/auth/login"
      backButtonLabel="Bạn đã có tài khoản ?"
    >
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tên người dùng</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                      />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}

                        type="email"
                        autoComplete="email"
                      />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="*********"
                        type="password"
                        autoComplete="current-password"
                      />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormSuccess message={success} />
              <FormError message={error} />
              <Button size={"sm"} className="px-0" variant={"link"} onClick={handleForgotPassword}>
                Quên mật khẩu?
              </Button>
            </div>
            <Button
              type="submit"
              className={cn(
                "w-full",
                status === "executing" ? "animate-pulse" : "",
              )}
            >
              Đăng kí
            </Button>
          </form>
        </Form>
      </div>
    </AuthCard>
  );
};

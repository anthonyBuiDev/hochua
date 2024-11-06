"use client";
import { cn } from "@/lib/utils";

import { SignIn } from "@/server/actions/signin";
import { LoginSchema } from "@/types/login-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
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

export const LoginForm = () => {
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");


  const { execute, status } = useAction(SignIn, {
    onSuccess(data) {
      if (data?.data?.error) setError(data?.data?.error);
      if (data?.data?.success) {
        setSuccess(data?.data?.success);
      }
    },
  });


  const handleForgotPassword = () => {
    setError("Liên hệ admin cấp lại mật khẩu");
  };

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    execute(values);
  };

  return (
    <AuthCard
      cardTitle="Chào mừng quay lại!"
      backButtonHref="/auth/register"
      backButtonLabel="Tạo tài khoản mới"
    >
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div>
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
                "my-4 w-full",
                status === "executing" ? "animate-pulse" : "",
              )}
            >
              {"Đăng nhập"}
            </Button>
          </form>
        </Form>
      </div>
    </AuthCard>
  );
};

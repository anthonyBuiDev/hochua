"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { LogOut, Moon, Settings, Sun } from "lucide-react";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function UserButton({ user }: Session) {
  const { setTheme, theme } = useTheme();
  const [checked, setChecked] = useState(false);
  const router = useRouter();
  function setSwitchState() {
    switch (theme) {
      case "dark":
        return setChecked(true);
      case "light":
        return setChecked(false);
      case "system":
        return setChecked(false);
    }
  }

  useEffect(() => {
    setSwitchState();
  }, []);

  if (user)
    return (
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger>
          <Avatar className="h-7 w-7">
            {user.image && (
              <Image
                src={user.image}
                alt={user.name!}
                fill={true}
                sizes="100vh"
              />
            )}
            {!user.image && (
              <AvatarFallback className="bg-primary/25">
                <div className="font-bold">
                  {user.name?.charAt(0).toUpperCase()}
                </div>
              </AvatarFallback>
            )}
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-64 p-6" align="end">
          <div className="mb-4 flex flex-col items-center gap-1 rounded-lg bg-primary/10  p-4">
            {user.image && (
              <Image
                src={user.image}
                alt={user.name!}
                className="rounded-full"
                width={36}
                height={36}
              />
            )}
            <p className="text-xs font-bold">{user.name}</p>
            <span className="text-xs font-medium text-secondary-foreground">
              {user.email}
            </span>
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => router.push("/dashboard/settings")}
            className="group cursor-pointer py-2 font-medium  ease-in-out "
          >
            <Settings
              size={14}
              className="mr-3 transition-all duration-300 ease-in-out group-hover:rotate-180"
            />
            Cài đặt
          </DropdownMenuItem>
          {theme && (
            <DropdownMenuItem className="cursor-pointer py-2 font-medium  ease-in-out">
              <div
                onClick={(e) => e.stopPropagation()}
                className="group flex items-center "
              >
                <div className="relative mr-3 flex">
                  <Sun
                    className="duration-750  absolute transition-all  ease-in-out group-hover:rotate-180 group-hover:text-yellow-600 dark:-rotate-90 dark:scale-0"
                    size={14}
                  />
                  <Moon
                    className="duration-750  rotate-90 scale-0 transition-all  ease-in-out group-hover:text-blue-400 dark:rotate-0 dark:scale-100"
                    size={14}
                  />
                </div>
                <p className="mr-3 text-secondary-foreground/75 text-yellow-600   dark:text-blue-400">
                  {theme[0].toUpperCase() + theme.slice(1)} Mode
                </p>
                <Switch
                  className="scale-75 "
                  checked={checked}
                  onCheckedChange={(e) => {
                    setChecked((prev) => !prev);
                    if (e) setTheme("dark");
                    if (!e) setTheme("light");
                  }}
                />
              </div>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem
            onClick={() => {
              signOut({ callbackUrl: "/auth/login" });
            }}
            className="group cursor-pointer py-2 font-medium focus:bg-destructive/30 "
          >
            <LogOut
              size={14}
              className="mr-3  transition-all duration-300 ease-in-out group-hover:scale-75"
            />
            Đăng xuất
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
}

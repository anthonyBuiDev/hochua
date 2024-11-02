import DashboardNav from "@/components/navigation/dashboard-nav";
import UserButton from "@/components/navigation/user-button";
import { auth } from "@/server/auth";
import { ArrowBigLeft, Factory, PenSquare, Settings } from "lucide-react";
import Link from "next/link";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  const userLinks = [
    {
      label: "Settings",
      path: "/dashboard/settings",
      icon: <Settings size={16} />,
    },
  ] as const;

  const adminLinks =
    session?.user?.roles === "admin"
      ? [
          {
            label: "Create",
            path: "/dashboard/add-workspace",
            icon: <PenSquare size={16} />,
          },
          {
            label: "Workspaces",
            path: "/dashboard/workspaces",
            icon: <Factory size={16} />,
          },
        ]
      : [];

  const allLinks = [...adminLinks, ...userLinks];

  return (
    <div className="mx-auto max-w-8xl flex-grow px-6 md:px-12">
      <header className="mt-4">
        <ul className="flex justify-between">
          <li>
            <Link
              href={"/"}
              className="font-medium text-sm flex gap-1 items-center"
            >
              <ArrowBigLeft />
              Trang chủ
            </Link>
          </li>
          <li>
            {session && (
              <UserButton expires={session?.expires} user={session?.user} />
            )}
          </li>
        </ul>
      </header>
      <DashboardNav allLinks={allLinks} />
      {children}
    </div>
  );
}

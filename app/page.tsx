import { auth } from "@/server/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await auth();

  if (!user) {
    return redirect("auth/login");
  }


  return redirect("/workspaces");
}

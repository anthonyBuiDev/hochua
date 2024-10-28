import { auth } from "@/server/auth";
import { redirect } from "next/navigation";

export default async function Home() {

  const user = await auth();

  if (user) {
    return redirect("/workspaces");
  }

  return redirect("auth/login");
}

import InputForm from "@/components/form/input-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getData } from "@/server/actions/get-data";
import { auth } from "@/server/auth";
import { redirect } from "next/navigation";


export default async function VanHanh({
  searchParams,
  params
}: {
  params: Promise<{ workspaceId: string }>
  searchParams: Promise<{ [elevation: string]: string }>
}) {
  const user = await auth();

  if (!user) {
    redirect("/login");
  }

  const { workspaceId } = await params;
  const { elevation, a1, a2 } = await searchParams || "";

  const data = await getData({ elevation, workspaceId, a1, a2 });

  return (
    <div className="w-full lg:max-w-7xl">
      <div className="rounded-md border">
        <Card>
          <CardHeader>
            <CardTitle className="uppercase text-center">
              Bảng tính hỗ trợ vận hành điều tiết hồ chứa nước
            </CardTitle>
            <CardDescription className="text-center text-red">{data.error && "Không tìm thấy thông số"}</CardDescription>
          </CardHeader>
          <CardContent>
            <InputForm q1={data?.success?.q1!} q2={data?.success?.q2!} characteristic={data?.success?.characteristic!} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

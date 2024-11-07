
import InputForm from "@/components/form/input-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getData } from "@/server/actions/get-data";
import { auth } from "@/server/auth";
import { Metadata } from "next";
import { redirect } from "next/navigation";
export const metadata: Metadata = {
  title: "Vận hành",
};

export default async function VanHanh() {
  const user = await auth();

  if (!user) {
    redirect("/login");
  }
  const data = await getData();


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
            <InputForm data={data?.success!} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


import InputForm from "@/components/form/input-form";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function VanHanh() {
  return (
    <div className="w-full lg:max-w-7xl">
      <div className="rounded-md border">
        <Card >
          <CardHeader>
            <CardTitle className="uppercase text-center">Bảng tính hổ trợ vận hành điều tiết hồ chứa nước</CardTitle>
          </CardHeader>
          <CardContent>
            <InputForm />
          </CardContent>
        </Card>
      </div>
    </div>
  )
    ;
}


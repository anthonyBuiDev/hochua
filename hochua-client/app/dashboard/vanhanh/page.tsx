import { InputForm } from "@/components/form/input-form";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
export default function VanHanh() {
  return <Card>
    <CardHeader>
      <CardTitle>Bang tinh</CardTitle>
    </CardHeader>
    <CardContent>
      <InputForm />
    </CardContent>

  </Card>;
}

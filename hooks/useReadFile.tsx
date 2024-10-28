
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import * as XLSX from "xlsx";

import { createBulkParameters, CreateParameter } from "@/server/actions/create-parameters";

import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";

type FormValues = z.infer<typeof FormSchema>;


const form = useForm<FormValues>({
  resolver: zodResolver(FormSchema),
  defaultValues: {
    file: null,
  },
});
const FormSchema = z.object({
  file: z.any().optional()
});

export const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  const file = event.target.files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = (e) => {
      const binaryStr = e.target?.result;
      const workbook = XLSX.read(binaryStr, { type: "binary" });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];

      const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: "-" });

      const parameters = jsonData.map((row: any) => ({
        tt: row["TT"],
        title: row["THÔNG SỐ"],
        unit: row["ĐƠN VỊ"],
        value: row["TRỊ SỐ"],
      }));
      form.setValue("file", parameters);
    };
  }


  const { execute, status } = useAction(createBulkParameters, {
    onSuccess: (data) => {
      if (data?.data?.success) {
        console.log(data?.data?.success)
      }
      if (data?.data?.error) {
        console.log(data?.data?.error)
      }
    },
    onExecute: (data) => {
      console.log("creating...", data);
    }
  });


  async function onSubmit(data: FormValues) {
    const parameters = data.file;

    execute(parameters);
    console.log(parameters)
  }
  return (<Form {...form} >
    <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6" >
      <FormField
        control={form.control}
        name="file"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Chọn file Excel </FormLabel>
            < FormControl >
              <Input
                id="file"
                type="file"
                accept=".xls,.xlsx"
                onChange={(event) => {
                  handleFileChange(event);
                  field.onChange(event);
                }}
              />
            </FormControl>
            < FormMessage />
          </FormItem>
        )}
      />
      < Button type="submit" disabled={status === 'executing'}> Submit </Button>
    </form>
  </Form>)

};



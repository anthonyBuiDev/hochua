"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { useMemo } from "react"
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"
type waterLevel = {
  date: string | null;
  limitLevel: string | null;
  emergencyLevel: string | null;
}
export default function Chart({ data }: { data: waterLevel[] }) {

  const customDateOrder = [
    "1/IX", "1/X", "31/X", "30/XI", "31/XII", "31/I", "28/II",
    "31/III", "30/IV", "31/V", "30/VI", "31/VII", "31/VIII"
  ];

  const sortedData = useMemo(() => {
    return data.sort((a, b) => {
      const aIndex = customDateOrder.indexOf(a.date || "");
      const bIndex = customDateOrder.indexOf(b.date || "");
      return aIndex - bIndex;
    });
  }, [data]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Biểu đồ điều phối cấp nước</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            emergencyLevel: {
              label: "Đường (1)",
              color: "hsl(217, 91%, 60%)",
            },
            limitLevel: {
              label: "Đường (2)",
              color: "hsl(0, 84%, 60%)",
            },
            line3: {
              label: "Đường (3)",
              color: "hsl(271, 91%, 65%)",
            },
            mntl: {
              label: "MNTL",
              color: "hsl(271, 70%, 50%)",
            },
            ctdl: {
              label: "Cao trình đỉnh đập",
              color: "hsl(216.8181818181818, 86.84210526315792%, 70.19607843137254%)",
            },
            mnlkt: {
              label: "MNLKT",
              color: "hsl(253.46938775510202, 30.43478260869564%, 68.43137254901961%)",
            },
            mndbt: {
              label: "MNDBT",
              color: "hsl(142, 71%, 45%)",
            },
            mnc: {
              label: "MNC",
              color: "hsl(48, 96%, 53%)",
            },
          }}
          className="h-[600px]"
        >
          <LineChart
            data={sortedData}
            margin={{ top: 20, right: 30, left: 50, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              label={{ value: "Tháng", position: "bottom" }}
            />
            <YAxis
              domain={[20, 28]}
              label={{ value: "Z (m)", angle: -90, position: "left" }}
            />
            <ChartTooltip content={<ChartTooltipContent />} />

            <Line
              type="monotone"
              dataKey="emergencyLevel"
              stroke="var(--color-emergencyLevel)"
              strokeWidth={2}
              dot={false}
              connectNulls
            />
            <Line
              type="monotone"
              dataKey="limitLevel"
              stroke="var(--color-limitLevel)"
              strokeWidth={2}
              dot={false}
              connectNulls
            />
            <Line
              type="monotone"
              dataKey="line3"
              stroke="var(--color-line3)"
              strokeWidth={2}
              dot={false}
              connectNulls
            />


            <Line
              type="monotone"
              dataKey="mntl"
              stroke="var(--color-mntl)"
              strokeWidth={1}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="ctdl"
              stroke="var(--color-ctdl"
              strokeWidth={1}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="mnlkt"
              stroke="var(--color-mnlkt)"
              strokeWidth={1}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="mndbt"
              stroke="var(--color-mndbt)"
              strokeWidth={1}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="mnc"
              stroke="var(--color-mnc)"
              strokeWidth={1}
              dot={false}
            />
          </LineChart>
        </ChartContainer>

        <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
          <div className="space-y-2">
            <p><span className="font-bold">(1):</span> Đường phòng phá hoại</p>
            <p><span className="font-bold">(2):</span> Đường hạn chế cấp nước</p>
            <p><span className="font-bold">(3):</span> Đường phòng lũ</p>
          </div>
          <div className="space-y-2">
            <p><span className="font-bold">Vùng A:</span> Vùng hạn chế cấp nước</p>
            <p><span className="font-bold">Vùng B:</span> Vùng cấp nước bình thường</p>
            <p><span className="font-bold">Vùng C:</span> Vùng cấp nước gia tăng</p>
            <p><span className="font-bold">Vùng D:</span> Vùng xả lũ bình thường</p>
            <p><span className="font-bold">Vùng E:</span> Vùng xả lũ khẩn cấp</p>
          </div>
        </div>
      </CardContent>
    </Card >
  )
}
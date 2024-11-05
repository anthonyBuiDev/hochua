"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import React from "react"

interface WaterLevelData {

  waterLevel: string | null;
  gateOpening: string | null;
  dischargeRate: string | null;

}

interface WaterLevelTableProps {
  data: WaterLevelData[];
}

export default function WaterLevelTable({ data }: WaterLevelTableProps) {

  const groupedData = data.reduce((acc: Record<string, WaterLevelData[]>, curr) => {
    const waterLevel = curr.waterLevel ?? "0";
    if (!acc[waterLevel]) {
      acc[waterLevel] = [];
    }
    acc[waterLevel].push(curr);
    return acc;
  }, {});


  const gateOpenings = [...new Set(data.map((d) => d.gateOpening))].sort(
    (a, b) => {
      if (a === null || b === null) return 0;
      return parseFloat(a.replace(",", ".")) - parseFloat(b.replace(",", "."));
    }
  );

  const sortedWaterLevels = Object.keys(groupedData).sort(
    (a, b) => parseFloat(a.replace(",", ".")) - parseFloat(b.replace(",", "."))
  );

  return (
    <div className="rounded-md border">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="uppercase text-center">
            BẢNG TRA QUAN HỆ GIỮA MỰC NƯỚC HỒ (M) VÀ LƯU LƯỢNG (M3/S) QUA TRÀN THEO ĐỘ MỞ CỬA VAN
          </CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center">
          <ScrollArea className="w-full h-[650px]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-center">MNTL</TableHead>
                  {gateOpenings.map((opening, index) => (
                    <TableHead key={index} className="text-center">{opening}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedWaterLevels.map((level, rowIndex) => (
                  <TableRow key={rowIndex} className="text-center">
                    <TableCell className="font-medium">{level}</TableCell>
                    {gateOpenings.map((opening) => {
                      const dataForOpening = groupedData[level].find(
                        (d) => d.gateOpening === opening
                      );
                      return (
                        <TableCell key={opening} className="font-medium">
                          {dataForOpening ? dataForOpening.dischargeRate : "-"}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </CardContent>
      </Card>
    </div>

  );
}

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
import React, { useMemo } from "react"

interface WaterLevelData {
  waterLevel: string | null
  gateOpening: string | null
  dischargeRate: string | null
}

interface WaterLevelTableProps {
  data: WaterLevelData[]
}

export default function WaterLevelTable({ data }: WaterLevelTableProps) {
  const groupedData = useMemo(() => {
    return data.reduce((acc: Record<string, WaterLevelData[]>, curr) => {
      const waterLevel = curr.waterLevel ?? "0"
      if (!acc[waterLevel]) {
        acc[waterLevel] = []
      }
      acc[waterLevel].push(curr)
      return acc
    }, {})
  }, [data])

  const gateOpenings = useMemo(() =>
    [...new Set(data.map((d) => d.gateOpening))].sort((a, b) => {
      if (a === null || b === null) return 0
      return parseFloat(a.replace(",", ".")) - parseFloat(b.replace(",", "."))
    }),
    [data]
  )

  const sortedWaterLevels = useMemo(() =>
    Object.keys(groupedData).sort(
      (a, b) => parseFloat(a.replace(",", ".")) - parseFloat(b.replace(",", "."))
    ),
    [groupedData]
  )

  return (
    <div className="rounded-md border">
      <Card className="w-full">
        <CardHeader className="text-center">
          <CardTitle className="uppercase">
            BẢNG TRA QUAN HỆ GIỮA MỰC NƯỚC HỒ (M) VÀ LƯU LƯỢNG (M3/S) QUA TRÀN THEO ĐỘ MỞ CỬA VAN
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex ">
            <div className="flex-none left-0 w-24 h-full bg-background ">
              <Table className="">
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-center">MNTL</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedWaterLevels.map((level, rowIndex) => (
                    <TableRow key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-muted/50' : ''}>
                      <TableCell className="text-center font-medium ">{level}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>

              </Table>
            </div>
            <ScrollArea className="h-full ">
              <div className="min-w-max">
                <Table>
                  <TableHeader>
                    <TableRow>
                      {gateOpenings.map((opening, index) => (
                        <TableHead key={index} className="text-center min-w-[100px]">{opening}</TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedWaterLevels.map((level, rowIndex) => (
                      <TableRow key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-muted/50' : ''}>
                        {gateOpenings.map((opening) => {
                          const dataForOpening = groupedData[level].find(
                            (d) => d.gateOpening === opening
                          )
                          return (
                            <TableCell key={opening} className="text-center">
                              {dataForOpening ? dataForOpening.dischargeRate : "-"}
                            </TableCell>
                          )
                        })}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>
        </CardContent>
      </Card>
    </div>

  )
}
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import * as React from "react";

type WaterLevel = {
  date: string | null;
  limitLevel: string | null;
  emergencyLevel: string | null;
};

export default function WaterLevelTable({ data }: { data: WaterLevel[] }) {
  // Define the custom date order
  const customDateOrder = [
    "31/III", "30/IV", "31/V", "30/VI", "31/VII", "31/VIII",
    "1/IX", "1/X", "31/X", "30/XI", "31/XII", "31/I", "28/II"
  ];

  // Prepare the data for the table
  const tableData = [
    {
      type: "Đường hạn chế cấp nước",
      ...data.reduce((acc, item) => ({ ...acc, [item.date!]: item.limitLevel }), {}),
    },
    {
      type: "Đường phòng phá hoại",
      ...data.reduce((acc, item) => ({ ...acc, [item.date!]: item.emergencyLevel }), {}),
    },
  ];


  const columns: ColumnDef<WaterLevel>[] = [
    {
      accessorKey: "type",
      header: "Ngày/ Tháng",
      cell: ({ row }) => {
        return <div className="font-medium">{row.getValue("type")}</div>;
      },
    },
    ...customDateOrder.map(date => ({
      accessorKey: date,
      header: date,
      cell: ({ row }: { row: any }) => {
        return <div className="text-center">{row.getValue(date)}</div>;
      },
    })),
  ];

  const table = useReactTable({
    data: tableData,
    columns: columns as ColumnDef<typeof tableData[number]>[],
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="uppercase text-center">BẢNG TRA TUNG ĐỘ ĐƯỜNG PHÒNG PHÁ HOẠI VÀ ĐƯỜNG HẠN CHẾ CẤP NƯỚC (ĐƠN VỊ: M)</CardTitle>
      </CardHeader>
      <CardContent >
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <TableHead key={header.id} className="px-2 text-center">
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map(row => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id} className="px-2 text-center">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>

  );
}

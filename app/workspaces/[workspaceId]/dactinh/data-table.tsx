"use client";


import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,

  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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

  getPaginationRowModel,

  useReactTable,
} from "@tanstack/react-table";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";




interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="rounded-md border">
      <Card>
        <CardHeader className="text-center">
          <CardTitle>BẢNG TRA ĐƯỜNG ĐẶC TÍNH LÒNG HỒ</CardTitle>
        </CardHeader>
        <CardContent>
          <Table className="">
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <div className="flex items-center justify-end gap-4 pt-4">
            <Button
              disabled={!table.getCanPreviousPage()}
              onClick={() => table.previousPage()}
              variant="outline"
            >
              <ChevronLeftIcon className="h-4 w-4" />
              <span>Previous Page</span>
            </Button>
            <Button
              disabled={!table.getCanNextPage()}
              onClick={() => table.nextPage()}
              variant="outline"
            >
              <span>Next page</span>
              <ChevronRightIcon className="h-4 w-4" />
            </Button>
          </div>

        </CardContent>
      </Card>
    </div >
  );
}

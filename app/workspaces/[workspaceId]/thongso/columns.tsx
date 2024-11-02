"use client";

import { ColumnDef } from "@tanstack/react-table";

type ParameterColumn = {
  title: string | null;
  unit: string | null;
  value: string | null;
  tt: string | null;
};

export const columns: ColumnDef<ParameterColumn>[] = [
  {
    header: "TT",
    accessorKey: "tt"
  },
  {
    accessorKey: "title",
    header: "Thông số",
  },
  {
    accessorKey: "unit",
    header: "Đơn vị",
  },
  {
    accessorKey: "value",
    header: "Trị số",
  },
];

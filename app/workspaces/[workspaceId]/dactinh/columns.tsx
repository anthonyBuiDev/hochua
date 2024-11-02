"use client";

import { ColumnDef } from "@tanstack/react-table";
type ParameterColumn = {
  elevation: string | null;
  surfaceArea: string | null;
  volume: string | null;
  workspaceId: string | null;
  id: number | null;
};

export const columns: ColumnDef<ParameterColumn>[] = [
  {
    header: "TT",
    cell: (id) => id.row.index + 1,
  },
  {
    accessorKey: "elevation",
    header: "Cao trình Z (m)",
  },
  {
    accessorKey: "surfaceArea",
    header: "Diện tích mặt hồ F (ha)",
  },
  {
    accessorKey: "volume",
    header: "Dung tích hồ V (106m³)",
  },
];

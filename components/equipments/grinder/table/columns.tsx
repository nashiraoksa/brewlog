"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Grinder } from "@/types/grinder";
import { Actions } from "./actions";

export const columns: ColumnDef<Grinder, any>[] = [
  {
    accessorKey: "no",
    header: "No.",
    cell: ({ row }) => {
      return <div>{row.index + 1}</div>;
    },
    enableHiding: false,
  },
  {
    id: "name",
    accessorFn: (row) => row.name,
    header: "Name",
  },
  {
    id: "type",
    accessorFn: (row) => row.type,
    header: "Type",
  },
  {
    accessorKey: "purchase_date",
    header: "Purchase Date",
    cell: ({ row }) =>
      row.original.purchase_date
        ? new Date(row.original.purchase_date).toDateString()
        : "-",
  },
  {
    id: "details",
    accessorFn: (row) => row.details,
    header: "Details",
  },
  {
    id: "actions",
    cell: ({ row, table }) => {
      const onDelete = table.options.meta?.onDelete as (id: string) => void;

      return <Actions item={row.original} onDelete={onDelete} />;
    },
  },
];

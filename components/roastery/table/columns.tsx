"use client";

import { ColumnDef } from "@tanstack/react-table";
import { COUNTRIES } from "@/lib/constants/countries";
import { Roastery } from "@/types/roastery";
import { Actions } from "./actions";

const COUNTRY_MAP = Object.fromEntries(COUNTRIES.map((c) => [c.code, c.name]));

export const columns: ColumnDef<Roastery, any>[] = [
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
    id: "address",
    accessorFn: (row) => row.address,
    header: "Address",
  },
  {
    id: "city",
    accessorFn: (row) => row.city,
    header: "City",
  },
  {
    accessorKey: "country",
    header: "Country",
    cell: ({ getValue }) => {
      const code = getValue<string>();
      return COUNTRY_MAP[code] ?? code;
    },
  },
  {
    id: "actions",
    cell: ({ row, table }) => {
      const onDelete = table.options.meta?.onDelete as (id: string) => void;

      return <Actions item={row.original} onDelete={onDelete} />;
    },
  },
];

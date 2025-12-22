"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { CoffeeWithRoastery } from "@/types/coffee";
import { COUNTRIES } from "@/lib/constants/countries";
import { Actions } from "./actions";
import { formatRupiah } from "@/lib/helper/rupiahFormatter";

const COUNTRY_MAP = Object.fromEntries(COUNTRIES.map((c) => [c.code, c.name]));

export const columns: ColumnDef<CoffeeWithRoastery>[] = [
  {
    accessorKey: "no",
    header: "No.",
    cell: ({ row }) => <div>{row.index + 1}</div>,
    enableHiding: false,
  },
  {
    id: "name",
    accessorFn: (row) => row.name,
    header: "Coffee Name",
  },
  {
    id: "roastery",
    accessorFn: (row) => row.roasteryRef?.name ?? row.roastery,
    header: "Roastery",
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
    accessorKey: "roast_level",
    header: "Roast",
    cell: ({ getValue }) => {
      const value = getValue<string>();
      return value.replace("_", " ");
    },
  },
  {
    accessorKey: "roast_date",
    header: "Roast Date",
    cell: ({ getValue }) => {
      const value = getValue<string | undefined>();
      return value ? format(new Date(value), "dd MMM yyyy") : "—";
    },
  },
  {
    accessorKey: "weight",
    header: "Weight (g)",
    cell: ({ getValue }) => {
      const weight = getValue<number>();
      return `${weight} g`;
    },
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ getValue }) => {
      const price = getValue<number | undefined>();
      return formatRupiah(price);
    },
  },

  {
    accessorKey: "flavor_profile",
    header: "Flavors",
    cell: ({ getValue }) => {
      const flavors = getValue<string[]>();
      return flavors.length ? flavors.join(", ") : "—";
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

"use client";

import { IconDotsVertical } from "@tabler/icons-react";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import EditRoasteryDialog from "../edit-dialog";

import { COUNTRIES } from "@/lib/constants/countries";
import { DeleteConfirm } from "../delete-confirm";
import { Roastery } from "@/types/roastery";

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

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <IconDotsVertical />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-32">
            <EditRoasteryDialog
              roastery={row.original}
              trigger={
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  Edit
                </DropdownMenuItem>
              }
            />

            <DeleteConfirm
              itemId={row.original.id}
              itemName={row.original.name}
              onDelete={onDelete}
              trigger={
                <DropdownMenuItem
                  onSelect={(e) => e.preventDefault()}
                  variant="destructive"
                >
                  Delete
                </DropdownMenuItem>
              }
            />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

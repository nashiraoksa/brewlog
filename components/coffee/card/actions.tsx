"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { IconDotsVertical } from "@tabler/icons-react";
import { DeleteConfirm } from "../delete-confirm";
import EditCoffeeDialog from "../edit-dialog";
import { useDeleteCoffee } from "@/hooks/coffee/useDeleteCoffee";
import { toast } from "sonner";
import { Coffee } from "@/types/coffee";

interface ActionsProps {
  item: Coffee;
}

export function Actions({ item }: ActionsProps) {
  const deleteCoffee = useDeleteCoffee();

  const handleItemDelete = (itemId: string) => {
    deleteCoffee.mutate(itemId, {
      onError: (err: any) => {
        toast.error(err.message);
      },
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="size-7">
          <IconDotsVertical className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <EditCoffeeDialog
          coffee={item}
          trigger={
            <DropdownMenuItem
              onSelect={(e) => {
                e.preventDefault();
              }}
            >
              Edit
            </DropdownMenuItem>
          }
        />
        <DeleteConfirm
          itemId={item.id}
          itemName={item.name}
          onDelete={handleItemDelete}
          trigger={
            <DropdownMenuItem
              onSelect={(e) => {
                e.preventDefault();
              }}
              className="text-destructive focus:text-destructive focus:bg-destructive/10 data-[highlighted]:text-destructive data-[highlighted]:bg-destructive/10"
            >
              Delete
            </DropdownMenuItem>
          }
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

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
import EditRoasteryDialog from "../edit-dialog";
import { useDeleteRoastery } from "@/hooks/roastery/useDeleteRoastery";
import { toast } from "sonner";
import { Roastery } from "@/types/roastery";

interface ActionsProps {
  item: Roastery;
}

export function Actions({ item }: ActionsProps) {
  const deleteRoastery = useDeleteRoastery();

  const handleItemDelete = (itemId: string) => {
    deleteRoastery.mutate(itemId, {
      onSuccess: () => {
        toast.success("Roastery deleted");
      },
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
        <EditRoasteryDialog
          roastery={item}
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

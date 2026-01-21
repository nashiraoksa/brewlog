"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { IconDotsVertical } from "@tabler/icons-react";
import { toast } from "sonner";
import { Scale } from "@/types/scale";
import { DeleteConfirm } from "../delete-confirm";
import { EditDrawer } from "../edit-drawer";
import { useDeleteScale } from "@/hooks/scale/useDeleteScale";

interface ActionsProps {
  item: Scale;
}

export function Actions({ item }: ActionsProps) {
  const deleteScale = useDeleteScale();

  const handleItemDelete = (itemId: string) => {
    deleteScale.mutate(itemId, {
      onSuccess: () => {
        toast.success("Scale deleted");
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
        <EditDrawer
          scale={item}
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

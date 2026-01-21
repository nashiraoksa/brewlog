"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { IconDotsVertical } from "@tabler/icons-react";
import { toast } from "sonner";
import { DeleteConfirm } from "../delete-confirm";
import { EditSheet } from "../edit-sheet";
import { BrewWithCoffee } from "@/types/brew";
import { useRouter } from "next/navigation";
import { useDeleteBrew } from "@/hooks/brew/useDeleteBrew";
import { DialogTimer } from "../timer/dialog-timer";
import { Trash, SquarePen, Eye, FlaskConical } from "lucide-react";
import { METHODS } from "@/lib/constants/methods";

const METHOD_MAP = Object.fromEntries(METHODS.map((c) => [c.id, c.name]));

interface ActionsProps {
  item: BrewWithCoffee;
}

export function Actions({ item }: ActionsProps) {
  const deleteBrew = useDeleteBrew();

  const handleItemDelete = (itemId: string) => {
    deleteBrew.mutate(itemId, {
      onSuccess: () => {
        toast.success("Brew deleted");
      },
      onError: (err: any) => {
        toast.error(err.message);
      },
    });
  };

  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="size-7">
          <IconDotsVertical className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onSelect={() => router.push(`/dashboard/brews/${item.id}`)}
        >
          <Eye />
          View
        </DropdownMenuItem>
        {item.steps.length > 0 && (
          <DialogTimer
            steps={item.steps}
            title={item.coffee.name}
            desc={METHOD_MAP[item.method]}
            trigger={
              <DropdownMenuItem
                onSelect={(e) => {
                  e.preventDefault();
                }}
              >
                <FlaskConical />
                Brew
              </DropdownMenuItem>
            }
          />
        )}
        <DropdownMenuSeparator />
        <EditSheet
          brew={item}
          trigger={
            <DropdownMenuItem
              onSelect={(e) => {
                e.preventDefault();
              }}
            >
              <SquarePen />
              Edit
            </DropdownMenuItem>
          }
        />
        <DeleteConfirm
          itemId={item.id}
          itemName={item.method}
          onDelete={handleItemDelete}
          trigger={
            <DropdownMenuItem
              onSelect={(e) => {
                e.preventDefault();
              }}
              className="text-destructive focus:text-destructive focus:bg-destructive/10 data-[highlighted]:text-destructive data-[highlighted]:bg-destructive/10"
            >
              <Trash className="text-destructive" />
              Delete
            </DropdownMenuItem>
          }
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

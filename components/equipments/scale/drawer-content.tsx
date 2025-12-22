import {
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
} from "@/components/ui/drawer";
import { Scale } from "@/types/scale";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import ScaleForm from "./scale-form";

interface DrawerContentProps {
  title: string;
  description: string;
  mode: "create" | "edit";
  initialData?: Scale | null;
  onSuccess: () => void;
  onClose: () => void;
}

export function ScaleDrawerContent({
  title,
  description,
  mode,
  initialData = null,
  onSuccess,
  onClose,
}: DrawerContentProps) {
  return (
    <DrawerContent className="w-1/3 h-full right-0 mt-0 rounded-none fixed inset-y-0">
      <DrawerHeader className="p-4">
        <DrawerTitle>{title}</DrawerTitle>
        <DrawerDescription className="text-foreground opacity-70">
          {description}
        </DrawerDescription>

        <DrawerClose asChild>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none disabled:pointer-events-none data-[state=open]:bg-secondary cursor-pointer size-7"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </DrawerClose>
      </DrawerHeader>

      <div className="flex-1 overflow-y-auto mt-2">
        <ScaleForm
          mode={mode}
          initialData={initialData}
          onSuccess={onSuccess}
          onClose={onClose}
        />
      </div>
    </DrawerContent>
  );
}

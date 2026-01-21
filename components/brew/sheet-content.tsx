import {
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import BrewForm from "./brew-form";
import { Brew } from "@/types/brew";

interface SheetContentProps {
  title: string;
  description: string;
  mode: "create" | "edit";
  initialData?: Brew | null;
  onSuccess: () => void;
  onClose: () => void;
}

export function BrewSheetContent({
  title,
  description,
  mode,
  initialData = null,
  onSuccess,
  onClose,
}: SheetContentProps) {
  return (
    <SheetContent className="h-full right-0 mt-0 rounded-none fixed inset-y-0">
      <SheetHeader className="p-4">
        <SheetTitle>{title}</SheetTitle>
        <SheetDescription className="text-foreground opacity-70">
          {description}
        </SheetDescription>
      </SheetHeader>

      <div className="flex-1 overflow-y-auto px-4 ">
        <BrewForm
          mode={mode}
          initialData={initialData}
          onSuccess={onSuccess}
          onClose={onClose}
        />
      </div>
    </SheetContent>
  );
}

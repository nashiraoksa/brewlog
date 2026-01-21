"use client";

import * as React from "react";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { Brew } from "@/types/brew";
import { BrewSheetContent } from "./sheet-content";

interface EditSheetProps {
  trigger: React.ReactElement;
  brew: Brew;
}

export function EditSheet({ trigger, brew }: EditSheetProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleSuccess = () => {
    setIsOpen(false);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>{trigger}</SheetTrigger>

      <BrewSheetContent
        title="Edit Item"
        description="Update the information for this existing item."
        mode="edit"
        onSuccess={handleSuccess}
        onClose={handleClose}
        initialData={brew}
      />
    </Sheet>
  );
}

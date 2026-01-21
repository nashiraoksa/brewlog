"use client";

import * as React from "react";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { BrewSheetContent } from "./sheet-content";

export function CreateSheet() {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleSuccess = () => {
    setIsOpen(false);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      {/* Desktop / Tablet trigger */}
      <SheetTrigger asChild>
        <Button className="hidden sm:inline-flex">
          <PlusIcon className="h-4 w-4 mr-1" />
          Add Brew
        </Button>
      </SheetTrigger>

      {/* Mobile FAB trigger */}
      <SheetTrigger asChild>
        <Button
          size="icon"
          className="sm:hidden fixed bottom-6 right-6 z-50 h-12 w-12 rounded-full shadow-lg"
        >
          <PlusIcon className="size-6" />
        </Button>
      </SheetTrigger>

      <BrewSheetContent
        title="Add Brew"
        description="Add a new brew by providing necessary info."
        mode="create"
        onSuccess={handleSuccess}
        onClose={handleClose}
        initialData={null}
      />
    </Sheet>
  );
}

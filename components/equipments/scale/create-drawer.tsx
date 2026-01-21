"use client";

import * as React from "react";
import { Drawer, DrawerTrigger } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { ScaleDrawerContent } from "./drawer-content";

export function CreateDrawer() {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleSuccess = () => {
    setIsOpen(false);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Drawer direction="right" open={isOpen} onOpenChange={setIsOpen}>
      {/* Desktop / Tablet trigger */}
      <DrawerTrigger asChild>
        <Button className="hidden sm:inline-flex">
          <PlusIcon className="h-4 w-4 mr-1" />
          Add Scale
        </Button>
      </DrawerTrigger>

      {/* Mobile FAB trigger */}
      <DrawerTrigger asChild>
        <Button
          size="icon"
          className="sm:hidden fixed bottom-6 right-6 z-50 h-12 w-12 rounded-full shadow-lg"
        >
          <PlusIcon className="size-6" />
        </Button>
      </DrawerTrigger>

      <ScaleDrawerContent
        title="Add Scale"
        description="Add a new scale by providing necessary info."
        mode="create"
        onSuccess={handleSuccess}
        onClose={handleClose}
        initialData={null}
      />
    </Drawer>
  );
}

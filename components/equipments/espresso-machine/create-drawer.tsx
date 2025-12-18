"use client";

import * as React from "react";
import { Drawer, DrawerTrigger } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { EspressoMachineDrawerContent } from "./drawer-content";

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
      <DrawerTrigger asChild>
        <Button>
          <PlusIcon className="h-4 w-4 mr-1" /> Add Espresso Machine
        </Button>
      </DrawerTrigger>

      <EspressoMachineDrawerContent
        title="Add Espresso Machine"
        description="Add a new espresso machine by providing necessary info."
        mode="create"
        onSuccess={handleSuccess}
        onClose={handleClose}
        initialData={null}
      />
    </Drawer>
  );
}

"use client";

import * as React from "react";
import { Drawer, DrawerTrigger } from "@/components/ui/drawer";
import { EspressoMachine } from "@/types/espresso-machine";
import { EspressoMachineDrawerContent } from "./drawer-content";

interface EditDrawerProps {
  trigger: React.ReactElement;
  espressoMachine: EspressoMachine;
}

export function EditDrawer({ trigger, espressoMachine }: EditDrawerProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleSuccess = () => {
    setIsOpen(false);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Drawer direction="right" open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>

      <EspressoMachineDrawerContent
        title="Edit Espresso Machine"
        description="Update the information for this existing item."
        mode="edit"
        onSuccess={handleSuccess}
        onClose={handleClose}
        initialData={espressoMachine}
      />
    </Drawer>
  );
}

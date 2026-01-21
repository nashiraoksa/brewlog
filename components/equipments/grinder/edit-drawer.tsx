"use client";

import * as React from "react";
import { Drawer, DrawerTrigger } from "@/components/ui/drawer";
import { Grinder } from "@/types/grinder";
import { GrinderDrawerContent } from "./drawer-content";

interface EditDrawerProps {
  trigger: React.ReactElement;
  grinder: Grinder;
}

export function EditDrawer({ trigger, grinder }: EditDrawerProps) {
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

      <GrinderDrawerContent
        title="Edit Item"
        description="Update the information for this existing item."
        mode="edit"
        onSuccess={handleSuccess}
        onClose={handleClose}
        initialData={grinder}
      />
    </Drawer>
  );
}

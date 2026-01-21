"use client";

import * as React from "react";
import { Drawer, DrawerTrigger } from "@/components/ui/drawer";
import { Scale } from "@/types/scale";
import { ScaleDrawerContent } from "./drawer-content";

interface EditDrawerProps {
  trigger: React.ReactElement;
  scale: Scale;
}

export function EditDrawer({ trigger, scale }: EditDrawerProps) {
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

      <ScaleDrawerContent
        title="Edit Item"
        description="Update the information for this existing item."
        mode="edit"
        onSuccess={handleSuccess}
        onClose={handleClose}
        initialData={scale}
      />
    </Drawer>
  );
}

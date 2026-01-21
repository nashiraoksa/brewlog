"use client";

import * as React from "react";
import { Drawer, DrawerTrigger } from "@/components/ui/drawer";
import { Kettle } from "@/types/kettle";
import { KettleDrawerContent } from "./drawer-content";

interface EditDrawerProps {
  trigger: React.ReactElement;
  kettle: Kettle;
}

export function EditDrawer({ trigger, kettle }: EditDrawerProps) {
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

      <KettleDrawerContent
        title="Edit Item"
        description="Update the information for this existing item."
        mode="edit"
        onSuccess={handleSuccess}
        onClose={handleClose}
        initialData={kettle}
      />
    </Drawer>
  );
}

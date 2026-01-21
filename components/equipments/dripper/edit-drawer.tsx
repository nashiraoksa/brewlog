"use client";

import * as React from "react";
import { Drawer, DrawerTrigger } from "@/components/ui/drawer";
import { Dripper } from "@/types/dripper";
import { DripperDrawerContent } from "./drawer-content";

interface EditDrawerProps {
  trigger: React.ReactElement;
  dripper: Dripper;
}

export function EditDrawer({ trigger, dripper }: EditDrawerProps) {
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

      <DripperDrawerContent
        title="Edit Item"
        description="Update the information for this existing item."
        mode="edit"
        onSuccess={handleSuccess}
        onClose={handleClose}
        initialData={dripper}
      />
    </Drawer>
  );
}

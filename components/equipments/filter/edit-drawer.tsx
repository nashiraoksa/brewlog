"use client";

import * as React from "react";
import { Drawer, DrawerTrigger } from "@/components/ui/drawer";
import { Filter } from "@/types/filter";
import { FilterDrawerContent } from "./drawer-content";

interface EditDrawerProps {
  trigger: React.ReactElement;
  filter: Filter;
}

export function EditDrawer({ trigger, filter }: EditDrawerProps) {
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

      <FilterDrawerContent
        title="Edit Item"
        description="Update the information for this existing item."
        mode="edit"
        onSuccess={handleSuccess}
        onClose={handleClose}
        initialData={filter}
      />
    </Drawer>
  );
}

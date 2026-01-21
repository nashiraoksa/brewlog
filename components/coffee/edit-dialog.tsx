"use client";

import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import { Coffee } from "@/types/coffee";
import { CoffeeDialogContent } from "./dialog-content";

interface EditCoffeeProps {
  trigger: React.ReactElement;
  coffee: Coffee;
}

export default function EditCoffeeDialog({ trigger, coffee }: EditCoffeeProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSuccess = () => {
    setIsOpen(false);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <CoffeeDialogContent
        title="Edit Item"
        description="Update the information for this existing coffee."
        mode="edit"
        onSuccess={handleSuccess}
        onClose={handleClose}
        initialData={coffee}
      />
    </Dialog>
  );
}

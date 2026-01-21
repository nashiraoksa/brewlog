"use client";

import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { PlusIcon } from "lucide-react";
import { CoffeeDialogContent } from "./dialog-content";

export default function CreateCoffeeDialog() {
  const [isOpen, setIsOpen] = useState(false);

  const handleSuccess = () => {
    setIsOpen(false);
  };

  const handleClose = () => {
    setIsOpen(false);
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {/* Desktop / Tablet trigger */}
      <DialogTrigger asChild>
        <Button className="hidden sm:inline-flex">
          <PlusIcon className="h-4 w-4 mr-1" />
          Add Coffee
        </Button>
      </DialogTrigger>

      {/* Mobile FAB trigger */}
      <DialogTrigger asChild>
        <Button
          size="icon"
          className="sm:hidden fixed bottom-6 right-6 z-50 h-12 w-12 rounded-full shadow-lg"
        >
          <PlusIcon className="h-6 w-6" />
        </Button>
      </DialogTrigger>

      <CoffeeDialogContent
        title="Create Coffee"
        description="Add a new coffee by providing necessary info."
        mode="create"
        onSuccess={handleSuccess}
        onClose={handleClose}
        initialData={null}
      />
    </Dialog>
  );
}

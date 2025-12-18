"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import RoasteryForm from "./roastery-form";
import { PlusIcon } from "lucide-react";

export default function CreateRoasteryDialog() {
  const [isOpen, setIsOpen] = useState(false);

  const handleSuccess = () => {
    setIsOpen(false);
  };

  const handleClose = () => {
    setIsOpen(false);
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="w-fit">
          <PlusIcon className="w-4" /> Add Roastery
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg max-h-3/4 md:max-h-full overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Roastery</DialogTitle>
        </DialogHeader>

        <RoasteryForm
          mode="create"
          onSuccess={handleSuccess}
          onClose={handleClose}
          initialData={null}
        />
      </DialogContent>
    </Dialog>
  );
}

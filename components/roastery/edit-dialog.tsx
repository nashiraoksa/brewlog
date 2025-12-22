"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import RoasteryForm from "./roastery-form";
import { Roastery } from "@/types/roastery";
import { RoasteryDialogContent } from "./dialog-content";

interface EditRoasteryProps {
  trigger: React.ReactElement;
  roastery: Roastery;
}

export default function EditRoasteryDialog({
  trigger,
  roastery,
}: EditRoasteryProps) {
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

      <DialogContent className="sm:max-w-lg max-h-3/4 md:max-h-full overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Roastery</DialogTitle>
        </DialogHeader>

        <RoasteryDialogContent
          title="Edit Item"
          description="Update the information for this existing roastery."
          mode="edit"
          onSuccess={handleSuccess}
          onClose={handleClose}
          initialData={roastery}
        />
      </DialogContent>
    </Dialog>
  );
}

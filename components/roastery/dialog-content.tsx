import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import RoasteryForm from "./roastery-form";
import { Roastery } from "@/types/roastery";

interface DialogContentProps {
  title: string;
  description: string;
  mode: "create" | "edit";
  initialData?: Roastery | null;
  onSuccess: () => void;
  onClose: () => void;
}

export function RoasteryDialogContent({
  title,
  description,
  mode,
  initialData = null,
  onSuccess,
  onClose,
}: DialogContentProps) {
  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>

      <div className="grid gap-4">
        <RoasteryForm
          mode={mode}
          initialData={initialData}
          onSuccess={onSuccess}
          onClose={onClose}
        />
      </div>
    </DialogContent>
  );
}

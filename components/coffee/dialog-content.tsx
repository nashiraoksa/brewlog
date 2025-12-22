import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
// import CoffeeForm from "./coffee-form";
import CoffeeForm from "./coffee-form";
import { Coffee } from "@/types/coffee";

interface DialogContentProps {
  title: string;
  description: string;
  mode: "create" | "edit";
  initialData?: Coffee | null;
  onSuccess: () => void;
  onClose: () => void;
}

export function CoffeeDialogContent({
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
        <CoffeeForm
          mode={mode}
          initialData={initialData}
          onSuccess={onSuccess}
          onClose={onClose}
        />
      </div>
    </DialogContent>
  );
}

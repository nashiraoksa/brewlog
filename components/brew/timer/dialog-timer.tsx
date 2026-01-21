import BrewTimer from "@/components/custom-component/BrewTimer";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Step } from "@/types/step";

type PropTypes = {
  steps: Omit<Step[], "id">;
  trigger: React.ReactElement;
  title?: string;
  desc?: string;
};

export function DialogTimer({ steps, trigger, title, desc }: PropTypes) {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{desc}</DialogDescription>
        </DialogHeader>

        <BrewTimer data={steps} />
      </DialogContent>
    </Dialog>
  );
}

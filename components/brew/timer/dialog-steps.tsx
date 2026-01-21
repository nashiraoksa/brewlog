import BrewTimer from "@/components/custom-component/BrewTimer";
import { TimePicker } from "@/components/custom-component/TimePicker";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Step } from "@/types/step";
import { PlusIcon, Trash2, Droplets, Timer, RotateCcw } from "lucide-react";
import { useState } from "react";

type PropTypes = {
  trigger: React.ReactElement;
  title?: string;
  desc?: string;
};

export function DialogSteps({ trigger, title, desc }: PropTypes) {
  const [steps, setSteps] = useState<Step[]>([]);
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);

  const [time, setTime] = useState({
    minutes: 0,
    seconds: 0,
  });

  const addStep = () => {
    setSteps((prev) => [
      ...prev,
      { order: prev.length + 1, session: "", water: 0, time: 0 },
    ]);
  };

  const removeStep = (index: number) => {
    setSteps((prev) =>
      prev.filter((_, i) => i !== index).map((s, i) => ({ ...s, order: i + 1 }))
    );
  };

  const updateStep = <K extends keyof Step>(
    index: number,
    key: K,
    value: Step[K]
  ) => {
    setSteps((prev) =>
      prev.map((s, i) => (i === index ? { ...s, [key]: value } : s))
    );
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const canContinue =
    steps.length > 0 && steps.every((s) => s.time > 0 && s.water > 0);

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent className="sm:max-w-[425px] space-y-4">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{desc}</DialogDescription>
        </DialogHeader>

        {/* ================= STEP 1 ================= */}
        {currentStep === 1 && (
          <div className="space-y-6 max-h-[300px] overflow-y-auto animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="w-full flex items-center justify-between mb-6">
              <h3 className="font-semibold">Brew Steps</h3>
              <Button size="sm" variant="outline" onClick={() => setSteps([])}>
                <RotateCcw className="w-3 h-3" /> Reset
              </Button>
            </div>

            {steps.map((step, index) => (
              <div
                key={index}
                className="grid grid-cols-3 gap-2 animate-in fade-in slide-in-from-bottom-2 duration-500"
              >
                <div className="col-span-3 flex items-center justify-between">
                  <span className="font-medium">Step {step.order}</span>
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon-sm"
                    onClick={() => removeStep(index)}
                  >
                    <Trash2 className="w-4" />
                  </Button>
                </div>

                <div className="col-span-3 space-y-2">
                  <Label>Session Name</Label>
                  <Input
                    value={step.session}
                    onChange={(e) =>
                      updateStep(index, "session", e.target.value)
                    }
                    placeholder="Blooming / first pour"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Water (ml)</Label>
                  <Input
                    type="number"
                    value={step.water}
                    onChange={(e) =>
                      updateStep(index, "water", Number(e.target.value))
                    }
                  />
                </div>

                <div className="col-span-2 space-y-2">
                  {/* <Label>Time (s)</Label> */}
                  {/* <Input
                    type="number"
                    value={step.time}
                    onChange={(e) =>
                      updateStep(index, "time", Number(e.target.value))
                    }
                  /> */}

                  <TimePicker
                    value={{
                      minutes: Math.floor(step.time / 60),
                      seconds: step.time % 60,
                    }}
                    onChange={(v) => {
                      setTime(v);
                      updateStep(
                        index,
                        "time",
                        Number(v.minutes * 60 + v.seconds)
                      );
                    }}
                  />
                </div>
              </div>
            ))}

            <Button type="button" size="sm" onClick={addStep}>
              <PlusIcon className="w-4 mr-1" />
              Add Step
            </Button>
          </div>
        )}

        {/* ================= STEP 2 ================= */}
        {currentStep === 2 && (
          <div className="space-y-4 max-h-[350px] overflow-y-auto animate-in fade-in slide-in-from-bottom-2 duration-500">
            <h3 className="font-semibold">Review</h3>

            {steps.map((step) => (
              <div
                key={step.order}
                className="rounded-md border p-3 text-sm space-y-1"
              >
                <p className="font-medium">
                  Step {step.order}: {step.session || "Unnamed"}
                </p>
                <p className="flex items-center gap-1">
                  <Droplets className="w-3.5 h-3.5 text-sky-500" /> {step.water}{" "}
                  ml · <Timer className="w-3.5 h-3.5 text-amber-600" />{" "}
                  {formatTime(step.time)} s
                </p>
              </div>
            ))}
          </div>
        )}

        {/* ================= STEP 3 ================= */}
        {currentStep === 3 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
            {/* <h3 className="font-semibold">Brew Coffee</h3> */}
            <BrewTimer data={steps} />
          </div>
        )}

        {/* ================= FOOTER ================= */}
        <div className="flex justify-between pt-2">
          <Button
            variant="outline"
            disabled={currentStep === 1}
            onClick={() => setCurrentStep((s) => (s - 1) as any)}
          >
            Back
          </Button>

          {currentStep < 3 ? (
            <Button
              onClick={() => setCurrentStep((s) => (s + 1) as any)}
              disabled={currentStep === 1 && !canContinue}
            >
              Next
            </Button>
          ) : (
            <Button disabled onClick={() => setCurrentStep(1)}>
              Done
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

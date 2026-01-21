import clsx from "clsx";
import { Droplets, Timer } from "lucide-react";

type BrewStep = {
  order: number;
  session: string;
  water: number;
  time: number;
};

type Props = {
  steps: BrewStep[];
  activeStep?: number;
};

const formatTime = (seconds: number) => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
};

export function BrewStepsTimeline({ steps, activeStep }: Props) {
  return (
    <div className="relative space-y-6">
      <div className="absolute left-4 top-0 bottom-0 w-px bg-border" />

      {steps
        .sort((a, b) => a.order - b.order)
        .map((step, index) => {
          const isActive = activeStep === step.order;
          const isCompleted =
            activeStep !== undefined && step.order < activeStep;

          return (
            <div key={step.order} className="relative flex gap-6">
              <div
                className={clsx(
                  "relative z-10 flex h-8 w-8 items-center justify-center rounded-full border text-sm font-semibold",
                  isActive && "border-primary bg-primary text-white",
                  isCompleted && "border-primary bg-primary/20",
                  !isActive && !isCompleted && "bg-background"
                )}
              >
                {step.order}
              </div>

              <div
                className={clsx(
                  "w-full rounded-lg border p-4 transition bg-card",
                  isActive && "border-primary shadow-sm"
                )}
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold capitalize">{step.session}</h4>
                  <div className="flex items-center gap-1">
                    <Timer className="w-4 text-primary" />
                    <span className="text-sm opacity-60">
                      {formatTime(step.time)}
                    </span>
                  </div>
                </div>

                <div className="mt-2 flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Droplets className="w-4 text-sky-600" />
                    <span>{step.water} g</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}

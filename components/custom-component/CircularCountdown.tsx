import { cn } from "@/lib/utils";

interface CountdownProps {
  totalTime: number;
  elapsed: number;
  isWarning?: boolean;
}

export function CircularCountdown({
  totalTime,
  elapsed,
  isWarning,
}: CountdownProps) {
  const radius = 100;
  const strokeWidth = 8;
  const circumference = 2 * Math.PI * radius;

  const progress = elapsed / totalTime;
  const offset = circumference * (1 - progress);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  return (
    <div className="relative h-58 w-58">
      <svg className="h-full w-full -rotate-90">
        <circle
          cx="50%"
          cy="50%"
          r={radius}
          strokeWidth={strokeWidth}
          className="fill-none stroke-muted"
        />
        <circle
          cx="50%"
          cy="50%"
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className={cn(
            "fill-none transition-all duration-1000 ease-linear",
            isWarning ? "stroke-orange-500 animate-pulse" : "stroke-primary"
          )}
        />
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span
          className={cn(
            "text-3xl font-bold transition-all duration-1000",
            isWarning &&
              "text-orange-500 text-4xl transition-all duration-500 animate-pulse"
          )}
        >
          {formatTime(elapsed)}
        </span>
        <span className="text-xs text-muted-foreground">
          / {formatTime(totalTime)}
        </span>
      </div>
    </div>
  );
}

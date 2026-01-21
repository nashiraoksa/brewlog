"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause, Droplets, Coffee, TimerReset } from "lucide-react";
import { CircularCountdown } from "./CircularCountdown";

interface Session {
  order: number;
  session: string;
  water: number;
  time: number;
}

export default function BrewTimer({ data }: { data: Session[] }) {
  const totalTime = data[data.length - 1].time;

  const [elapsed, setElapsed] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const { current, next } = useMemo(() => {
    const index = data.findIndex((s) => elapsed < s.time);

    return {
      current: data[index] ?? data[data.length - 1],
      next: data[index + 1],
    };
  }, [elapsed, data]);

  const secondsToNext = Math.max(0, current.time - elapsed);
  const showAlert = secondsToNext > 0 && secondsToNext <= 5;

  const hasEnded = elapsed >= totalTime;

  useEffect(() => {
    if (!isRunning || elapsed >= totalTime) return;

    const interval = setInterval(() => {
      setElapsed((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, elapsed, totalTime]);

  useEffect(() => {
    if (elapsed >= totalTime) {
      setIsRunning(false);
    }
  }, [elapsed, totalTime]);

  const handleStartPause = () => setIsRunning((p) => !p);

  const handleReset = () => {
    setIsRunning(false);
    setElapsed(0);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Step Info */}
      <div
        key={current.order}
        className="text-center space-y-1 animate-in fade-in slide-in-from-bottom-2 duration-1000"
      >
        <p className="text-sm text-muted-foreground">
          Step {current.order} of {data.length}
        </p>

        {hasEnded ? (
          <h2 className="text-primary text-2xl font-bold capitalize flex items-center justify-center gap-1 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <Coffee strokeWidth={3} /> Done!
          </h2>
        ) : (
          <>
            <h2 className="text-2xl font-bold capitalize">{current.session}</h2>
            <div className="flex items-center gap-1 justify-center">
              <Droplets className="w-4 text-sky-500" />
              <p className="text-sm text-muted-foreground">
                Water up to: {current.water}g
              </p>
            </div>
          </>
        )}
      </div>

      {/* Circular Timer */}
      <div className="text-center space-y-2">
        <CircularCountdown
          totalTime={totalTime}
          elapsed={elapsed}
          isWarning={showAlert}
        />

        {!hasEnded && (
          <div className="flex justify-center mt-2">
            <div className="flex items-center gap-2 text-orange-500 text-sm min-h-[20px]">
              {showAlert && (
                <>
                  <span className="relative flex h-3 w-3">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-orange-500 opacity-75 animate-ping" />
                    <span className="relative inline-flex h-3 w-3 rounded-full bg-orange-500" />
                  </span>
                  <span>Next step in {secondsToNext}s</span>
                </>
              )}
            </div>
          </div>
        )}

        {hasEnded ? (
          <p className="text-sm text-muted-foreground">Enjoy your coffee~</p>
        ) : (
          <p className="text-sm text-muted-foreground">
            Next at {formatTime(current.time)} →{" "}
            {next ? next.session : "Finish!"}
          </p>
        )}
      </div>

      {/* Controls */}
      <div className="flex gap-3 mt-4">
        {!hasEnded && (
          <Button onClick={handleStartPause}>
            {isRunning ? <Pause className="w-4" /> : <Play className="w-4" />}
            {isRunning ? "Pause" : "Start"}
          </Button>
        )}

        <Button variant="outline" onClick={handleReset}>
          <TimerReset className="w-4" />
          Restart
        </Button>
      </div>
    </div>
  );
}

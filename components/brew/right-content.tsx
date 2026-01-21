"use client";

import { Button } from "@/components/ui/button";
import { Timer } from "lucide-react";
import { CreateSheet } from "./create-sheet";
import { DialogSteps } from "./timer/dialog-steps";

export default function RightContent() {
  return (
    <div className="flex gap-2">
      <DialogSteps
        // title="Brew Timer"
        // desc="Timer for brewing coffee."
        trigger={
          <Button variant="outline">
            <Timer className="w-4" /> Timer
          </Button>
        }
      />
      <CreateSheet />
    </div>
  );
}

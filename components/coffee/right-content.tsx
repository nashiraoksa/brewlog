"use client";

import { Button } from "@/components/ui/button";
import { DownloadIcon } from "lucide-react";
import CreateCoffeeDialog from "./create-dialog";
import { toast } from "sonner";

export default function RightContent() {
  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        onClick={() => {
          toast.success("Data downloaded!");
        }}
      >
        <DownloadIcon className="size-4" /> Download
      </Button>
      <CreateCoffeeDialog />
    </div>
  );
}

"use client";

import * as React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

type Time = { minutes: number; seconds: number };

export function TimePicker({
  value,
  onChange,
  maxMinutes = 59,
}: {
  value: Time;
  onChange: (v: Time) => void;
  maxMinutes?: number;
}) {
  return (
    <div className="flex items-end gap-3">
      {/* Minutes */}
      <div className="grid gap-1">
        <Label>Minutes</Label>
        <Select
          value={String(value.minutes)}
          onValueChange={(v) =>
            onChange({
              minutes: Number(v),
              seconds: value.seconds,
            })
          }
        >
          <SelectTrigger className="w-24">
            <SelectValue placeholder="00" />
          </SelectTrigger>
          <SelectContent className="max-h-[180px]">
            <SelectGroup>
              {Array.from({ length: maxMinutes + 1 }).map((_, i) => (
                <SelectItem key={i} value={String(i)}>
                  {i.toString().padStart(2, "0")}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <span className="pb-2 text-lg font-medium">:</span>

      {/* Seconds */}
      <div className="grid gap-1">
        <Label>Seconds</Label>
        <Select
          value={String(value.seconds)}
          onValueChange={(v) =>
            onChange({
              minutes: value.minutes,
              seconds: Number(v),
            })
          }
        >
          <SelectTrigger className="w-24">
            <SelectValue placeholder="00" />
          </SelectTrigger>
          <SelectContent className="max-h-[180px]">
            <SelectGroup>
              {Array.from({ length: 60 }).map((_, i) => (
                <SelectItem key={i} value={String(i)}>
                  {i.toString().padStart(2, "0")}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

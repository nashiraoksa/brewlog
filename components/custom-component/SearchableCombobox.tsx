"use client";

import { Check, ChevronsUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import React from "react";

interface Roastery {
  id: string;
  name: string;
  country: string;
}

interface SearchableComboboxProps {
  roasteries: Roastery[];
  value?: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  placeholder?: string;
  width?: string;
}

export function SearchableCombobox(props: SearchableComboboxProps) {
  const { roasteries, value, onChange, disabled, placeholder } = props;
  const [open, setOpen] = React.useState(false);

  const selected = roasteries.find((r) => r.id === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          role="combobox"
          aria-expanded={open}
          disabled={disabled}
          className="w-full justify-between"
        >
          <span className="w-full truncate text-left">
            {selected ? selected.name : placeholder ?? "Select roastery"}
          </span>
          <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="p-0 w-[var(--radix-popover-trigger-width)]">
        <Command>
          <CommandInput placeholder="Search roastery..." />
          <CommandList>
            <CommandEmpty>No roastery found.</CommandEmpty>
            <CommandGroup>
              {roasteries.map((roastery, idx) => (
                <CommandItem
                  key={idx}
                  value={roastery.name}
                  onSelect={() => {
                    onChange(roastery.id);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "h-4 w-4",
                      roastery.id === value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <span className={`w-full truncate`}>{roastery.name}</span>
                  {roastery.country ? (
                    <span className="ml-2 text-xs text-muted-foreground">
                      {roastery.country}
                    </span>
                  ) : null}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

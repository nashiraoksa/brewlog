import { ReactNode } from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export type ToggleOption<T extends string> = {
  value: T;
  label?: string;
  icon?: ReactNode;
};

type ToggleButtonProps<T extends string> = {
  value: T;
  options: readonly ToggleOption<T>[];
  onValueChange: (value: T) => void;
  className?: string;
};

export function ToggleButton<T extends string>({
  value,
  options,
  onValueChange,
  className,
}: ToggleButtonProps<T>) {
  return (
    <ToggleGroup
      variant="outline"
      type="single"
      value={value}
      onValueChange={(val) => {
        if (val) onValueChange(val as T);
      }}
      className={className}
    >
      {options.map(({ value, label, icon }) => (
        <ToggleGroupItem
          key={value}
          value={value}
          aria-label={label ?? value}
          className="cursor-pointer"
        >
          {icon ?? label}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}

import { Search } from "lucide-react";
import { Input } from "../ui/input";
import React, { ChangeEventHandler, KeyboardEventHandler } from "react";

interface SearchInputProps {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
  placeholder?: string;
  onSearchSubmit?: (searchValue: string) => void;
  ariaLabel?: string;
}

export default function SearchInput({
  value,
  onChange,
  onKeyDown,
  onSearchSubmit,
  placeholder = "Search...",
  ariaLabel = "Search input field",
}: SearchInputProps) {
  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (event) => {
    onKeyDown?.(event);

    if (event.key === "Enter" && onSearchSubmit) {
      event.preventDefault();
      onSearchSubmit(value);
    }
  };

  return (
    <div className="relative w-full">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />

      <Input
        type="search"
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        aria-label={ariaLabel}
        className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px] border border-gray"
      />
    </div>
  );
}

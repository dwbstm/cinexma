"use client";

import { useRef } from "react";
import { Input, InputProps, Spinner } from "@heroui/react";
import { cn } from "@/utils/helpers";
import { Search } from "iconoir-react";

interface SearchInputProps extends InputProps {
  isLoading?: boolean;
}

const SearchInput = ({
  value,
  onChange,
  className,
  autoFocus,
  placeholder = "Search...",
  isLoading,
  isDisabled,
}: SearchInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <Input
      ref={inputRef}
      isDisabled={isDisabled}
      autoComplete="off"
      size="lg"
      autoFocus={autoFocus}
      className={cn(className, "")}
      placeholder={placeholder}
      value={value}
      radius="full"
      onChange={onChange}
      classNames={{
        input: "text-sm",
        inputWrapper:
          "group-data-[focus=true]:ring-blue-primary/70 group-data-[focus=true]:ring-[1.5px] shadow",
      }}
      aria-label="Search"
      type="search"
      labelPlacement="outside"
      startContent={
        <div className="text-default-400 pointer-events-none flex flex-shrink-0 items-center pr-1">
          {isLoading ? <Spinner color="default" size="sm" /> : <Search />}
        </div>
      }
    />
  );
};

export default SearchInput;

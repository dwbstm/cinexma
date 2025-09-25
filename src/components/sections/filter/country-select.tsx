"use client";

import { cn } from "@/utils/helpers";
import { Select, SelectItem, SelectProps } from "@heroui/react";
import countries from "@/config/countries.json";

const CountrySelect: React.FC<Omit<SelectProps, "children" | "isLoading" | "selectionMode">> = ({
  ...props
}) => {
  return (
    <Select
      {...props}
      classNames={{
        label: "text-xs",
        value: "text-xs",
      }}
      size="sm"
      selectionMode="single"
      label="Country"
      placeholder="Select country"
      className={cn("tablet:max-w-xs max-w-[10rem]", props.className)}
    >
      {countries?.map((country) => {
        return <SelectItem key={country.iso_639_1}>{country.english_name}</SelectItem>;
      })}
    </Select>
  );
};

export default CountrySelect;

import { cn } from "@/utils/helpers";
import { Select, SelectItem, SelectProps } from "@heroui/react";

const YearSelect: React.FC<Omit<SelectProps, "children" | "isLoading" | "selectionMode">> = ({
  ...props
}) => {
  const year = new Date().getFullYear();
  const years = Array.from({ length: 12 + 1 }, (_, i) => year - i);
  return (
    <Select
      {...props}
      classNames={{
        label: "text-xs",
        value: "text-xs",
      }}
      size="sm"
      selectionMode="single"
      label="Year"
      placeholder="Select year"
      className={cn("tablet:max-w-xs max-w-[10rem]", props.className)}
    >
      {years.map((year) => (
        <SelectItem key={year}>{year.toString()}</SelectItem>
      ))}
    </Select>
  );
};

export default YearSelect;

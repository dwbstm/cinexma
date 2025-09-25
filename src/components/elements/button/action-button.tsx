import { cn } from "@/utils/helpers";
import { Tooltip } from "@heroui/react";
import Link from "next/link";

interface ActionButtonProps {
  label: string;
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  tooltip?: string;
  disabled?: boolean;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  label,
  href = "",
  children,
  onClick,
  tooltip,
  disabled,
}) => {
  const Button = (
    <Tooltip content={tooltip} isDisabled={disabled || !tooltip} showArrow placement="bottom">
      <button
        aria-label={label}
        onClick={onClick}
        disabled={disabled}
        className={cn("group drop-shadow-md hover:cursor-pointer [&>svg]:transition-all", {
          "[&>svg]:hover:text-blue-primary hover:[&>svg]:scale-125": !disabled,
          "cursor-not-allowed opacity-50": disabled,
        })}
      >
        {children}
      </button>
    </Tooltip>
  );

  return href ? (
    <Link href={href} className="flex items-center">
      {Button}
    </Link>
  ) : (
    Button
  );
};

export default ActionButton;

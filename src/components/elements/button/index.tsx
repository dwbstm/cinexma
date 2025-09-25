"use client";

import { motion } from "framer-motion";
import { PlaySolid } from "iconoir-react";
import type { ReactNode } from "react";

type Props = {
  children?: ReactNode;
  variant:
    | { name: "primary"; isInverted: boolean }
    | { name: "secondary" }
    | { name: "topbar"; isInverted: boolean };
  isFull?: boolean;
  onClick?: () => void;
};

const Button = ({ children, variant, isFull, onClick = () => {} }: Props) => {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      aria-label={variant.name}
      onClick={onClick}
      className={`cursor-pointer ${variant.name === "primary" && !variant.isInverted ? "bg-zinc-800" : ""} ${
        variant.name === "primary" && variant.isInverted ? "bg-zinc-200 text-black" : ""
      } ${
        variant.name === "secondary" ? "bg-blue-primary text-zinc-200" : ""
      } ${variant.name === "topbar" && !variant.isInverted ? "bg-zinc-800" : ""} ${
        variant.name === "topbar" && variant.isInverted ? "bg-zinc-200 text-black" : ""
      } ${isFull ? "w-full" : ""} ${variant.name === "topbar" ? "h-10" : "h-12"} rounded px-4`}
    >
      <div className="mx-auto flex w-min items-center gap-2">
        {variant.name === "primary" ? (
          <PlaySolid
            className={`${variant.isInverted ? "fill-background-dark" : "fill-zinc-200"}`}
          />
        ) : null}

        {variant.name === "topbar" ? (
          <PlaySolid
            className={`${variant.isInverted ? "fill-background-dark" : "fill-zinc-200"}`}
          />
        ) : null}

        {children ? (
          <span className="tablet:text-sm text-xs font-semibold whitespace-nowrap">{children}</span>
        ) : null}
      </div>
    </motion.button>
  );
};

export default Button;

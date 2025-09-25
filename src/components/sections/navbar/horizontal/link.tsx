"use client";

import useActiveSegment from "@/hooks/useActiveSegment";
import { motion } from "framer-motion";
import NextLink from "next/link";
import type { ComponentType } from "react";

type Props = {
  href: string;
  Icon: ComponentType<React.SVGProps<SVGSVGElement>>;
  Label: string;
};

const Link = ({ href, Icon, Label }: Props) => {
  const isActive = useActiveSegment(href);

  return (
    <motion.li whileTap={{ scale: 0.75 }}>
      <NextLink href={href} aria-label="This is a link" className="flex flex-col items-center">
        <Icon
          className={`${isActive ? "text-blue-primary opacity-100" : "opacity-40"} mb-1 h-6 w-6`}
        />
        <span
          className={`${isActive ? "text-blue-primary opacity-100" : "opacity-40"} block text-[10px]`}
        >
          {Label}
        </span>
      </NextLink>
    </motion.li>
  );
};

export default Link;

"use client";

import useActiveSegment from "@/hooks/useActiveSegment";
import { motion } from "framer-motion";
import { Minus } from "iconoir-react";
import NextLink from "next/link";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const Links = ({ children }: Props) => {
  return (
    <>
      <ul className="absolute -top-10 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-black/80 px-4 py-2 text-xs backdrop-blur">
        <Link href="/movies" label="Movies" />
        <Minus className="w-4 rotate-90" />
        <Link href="/series" label="Series" />
      </ul>
      <ul className="flex items-center justify-evenly gap-x-5 bg-black/80 p-4 backdrop-blur">
        {children}
      </ul>
    </>
  );
};

export default Links;

const Link = ({ href, label }: { href: string; label: string }) => {
  const isActive = useActiveSegment(href);

  return (
    <motion.li whileTap={{ scale: 0.75 }}>
      <NextLink href={href} className={`${isActive ? "text-blue-primary" : "opacity-40"}`}>
        {label}
      </NextLink>
    </motion.li>
  );
};

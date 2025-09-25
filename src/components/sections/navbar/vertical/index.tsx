"use client";

import { useState } from "react";
import Link from "./link";
import Links from "./links";
import NextLink from "next/link";
import { CinemaOld, Heart, HomeAlt, ModernTv, Search } from "iconoir-react";
import Image from "next/image";
import { usePathname } from "next/navigation";

const list = [
  {
    id: 0,
    href: "/favorite",
    Icon: Heart,
    to: "Favorite",
  },
  {
    id: 1,
    href: "/",
    Icon: HomeAlt,
    to: "Home",
  },
  {
    id: 2,
    href: "/movies",
    Icon: CinemaOld,
    to: "Movies",
  },
  {
    id: 3,
    href: "/series",
    Icon: ModernTv,
    to: "Series",
  },
  {
    id: 4,
    href: "/search",
    Icon: Search,
    to: "Search",
  },
];

const Vertical = () => {
  const pathName = usePathname();
  const show = list.map((item) => item.href).includes(pathName);
  const [isOnHovered, setIsOnHovered] = useState(false);

  return (
    show && (
      <>
        <div
          className={`${
            isOnHovered ? "opacity-100" : "opacity-0"
          } transition-smooth from-background-dark pointer-events-none fixed z-40 h-screen w-screen bg-gradient-to-r to-transparent`}
        />
        <nav className="sticky top-0 z-50 flex h-screen flex-col">
          <NextLink href="/" className="px-6 py-12">
            <Image
              alt="App Logo"
              src="/icons/icon-app.png"
              priority
              width={68}
              height={48}
              sizes="100px"
              className={`transition-smooth h-[48px] w-[68px] object-contain`}
            />
          </NextLink>
          <Links setIsOnHovered={setIsOnHovered}>
            {list.map(({ id, href, to, Icon }) => (
              <Link
                key={id}
                id={id}
                href={href}
                to={to}
                Icon={Icon}
                isOnHovered={isOnHovered}
                setIsOnHovered={setIsOnHovered}
              />
            ))}
          </Links>
        </nav>
      </>
    )
  );
};

export default Vertical;

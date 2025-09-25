"use client";

import { Heart, HomeSimple, Search } from "iconoir-react";
import Link from "./link";
import Links from "./links";
import { usePathname } from "next/navigation";

const list = [
  {
    id: 1,
    href: "/",
    Icon: HomeSimple,
    Label: "Home",
  },
  {
    id: 2,
    href: "/search",
    Icon: Search,
    Label: "Search",
  },
  {
    id: 3,
    href: "/favorite",
    Icon: Heart,
    Label: "Favorite",
  },
];

const Horizontal = () => {
  const pathName = usePathname();
  const show = !pathName.startsWith("/premier");

  return (
    <>
      <nav className="tablet:hidden fixed inset-x-0 bottom-0 z-50">
        {show && (
          <Links>
            {list.map(({ id, href, Icon, Label }) => (
              <Link key={id} href={href} Icon={Icon} Label={Label} />
            ))}
          </Links>
        )}
      </nav>
    </>
  );
};

export default Horizontal;

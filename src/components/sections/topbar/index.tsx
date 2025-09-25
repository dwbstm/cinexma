"use client";

import Button from "@/components/elements/button";
import { useRouter } from "@bprogress/next/app";
import { NavArrowLeft } from "iconoir-react";
import { useEffect, useState } from "react";

interface TopbarProps {
  title?: string;
  Ref?: React.RefObject<HTMLDivElement | null>;
  isDetail?: boolean;
  onClick?: () => void;
}

export default function Topbar({ title, Ref, onClick, isDetail }: TopbarProps) {
  const [isFixed, setIsFixed] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      if (!Ref?.current) return;
      const offsetTop = Ref.current.getBoundingClientRect().top + window.scrollY;
      setIsFixed(window.scrollY >= offsetTop);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [Ref]);

  return (
    <section
      id="Topbar"
      className={`absolute right-0 left-0 z-30 transition-all duration-300 ${isFixed ? "fixed top-0" : "top-2"}`}
    >
      <div className="relative">
        <div
          id="nav-items"
          className={`px-3 py-6 transition-all duration-300 ${isFixed ? "bg-black" : ""}`}
        >
          <button
            onClick={() => router.back()}
            className="cursor-pointer rounded-full bg-zinc-800 p-1"
          >
            <NavArrowLeft width={24} height={24} />
          </button>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform">
            {isFixed && (
              <>
                <h2
                  id="Title"
                  className="tablet:max-w-full tablet:text-xl max-w-44 truncate font-semibold transition-all duration-300"
                >
                  {title}
                </h2>
                {isDetail && (
                  <div className="absolute inset-0 top-8 flex justify-center">
                    <Button
                      variant={{
                        name: "topbar",
                        isInverted: true,
                      }}
                      onClick={onClick}
                    >
                      Watch Now
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

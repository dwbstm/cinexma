"use client";

import { getImageUrl } from "@/utils/medias";
import Image from "next/image";
import { useEffect, useState } from "react";

interface BackdropProps {
  src: string;
  isAlwaysDisplayed: boolean;
}

const Backdrop: React.FC<BackdropProps> = ({ src, isAlwaysDisplayed }) => {
  const [isDisplayed, setIsDisplayed] = useState(true);

  useEffect(() => {
    if (isAlwaysDisplayed) {
      setIsDisplayed(true);
      return;
    }

    const timer = setTimeout(() => {
      setIsDisplayed(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, [isAlwaysDisplayed]);

  return (
    <>
      {isDisplayed ? <div className="bg-background-dark absolute inset-0" /> : null}
      <Image
        src={getImageUrl(src, "backdrop", true)}
        alt="Showcase"
        fill
        sizes="100vw"
        priority
        className={`${
          isDisplayed ? "opacity-100" : "tablet:opacity-0"
        } object-cover brightness-110 transition-all duration-1000 ease-in`}
      />
    </>
  );
};

export default Backdrop;

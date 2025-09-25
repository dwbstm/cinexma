"use client";
import Link from "next/link";
import { Movie } from "tmdb-ts";
import Card from "./card";
import Loop from "@/components/elements/loop";
import { Skeleton } from "@heroui/react";

interface PortraitProps {
  data: Movie[];
  title: string;
  params: string;
}

const Portrait: React.FC<PortraitProps> = ({ data, title, params }) => {
  return (
    <main className="group relative">
      <section className="mb-2 flex items-center justify-between">
        <h1 className="tablet:text-medium text-sm font-semibold">{title}</h1>
        <Link href={`/movies?type=${params}`}>
          <p className="tablet:mr-3 tablet:text-xs text-[10px]">See all</p>
        </Link>
      </section>
      <section className="flex flex-auto snap-x scroll-p-5 space-x-2 overflow-x-auto scroll-smooth">
        {data ? (
          <>
            {data.map((val, idx) => (
              <div key={idx} className="tablet:min-w-[155px] min-w-[120px] snap-start">
                <Card mediaType="movie" media={val} />
              </div>
            ))}
          </>
        ) : (
          <Loop count={20} prefix="SkeletonPosterCard">
            <div className="tablet:min-w-[155px] min-w-[120px] snap-start">
              <Skeleton className="aspect-[0.667] w-full rounded-md" />
            </div>
          </Loop>
        )}
      </section>
    </main>
  );
};

export default Portrait;

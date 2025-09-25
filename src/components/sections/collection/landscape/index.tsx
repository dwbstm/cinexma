import Link from "next/link";
import { TV } from "tmdb-ts";
import Card from "./card";
import Loop from "@/components/elements/loop";
import { Skeleton } from "@heroui/react";

interface LandscapeProps {
  data: TV[];
  title: string;
  params: string;
}

const Landscape: React.FC<LandscapeProps> = ({ data, title, params }) => {
  return (
    <main className="group relative">
      <section className="mb-2 flex items-center justify-between">
        <h1 className="tablet:text-medium text-sm font-semibold">{title}</h1>
        <Link href={`/series?type=${params}`}>
          <p className="tablet:mr-3 tablet:text-xs text-[10px]">See all</p>
        </Link>
      </section>
      <section className="flex flex-auto snap-x scroll-p-5 space-x-2 overflow-x-auto scroll-smooth">
        {data ? (
          <>
            {data.map((val, idx) => (
              <div key={idx} className="tablet:max-w-64 max-w-52 snap-start">
                <Card data={val} />
              </div>
            ))}
          </>
        ) : (
          <Loop count={20} prefix="SkeletonPosterCard">
            <div className="tablet:min-w-64 min-w-52 snap-start">
              <Skeleton className="aspect-video w-full rounded-md" />
            </div>
          </Loop>
        )}
      </section>
    </main>
  );
};

export default Landscape;

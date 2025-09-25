"use client";

import { tmdb } from "@/services/api/tmdb";
import { Spinner, Tab, Tabs } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import { Suspense, use, useRef } from "react";
import { notFound } from "next/navigation";
import Topbar from "@/components/sections/topbar";
import Billboard from "@/components/sections/billboard";
import Content from "@/components/layouts/content";
import Showcase from "@/components/sections/showcase";
import { useRouter } from "@bprogress/next/app";
import { kebabCase } from "string-ts";
import { useDocumentTitle } from "@mantine/hooks";
import { siteConfig } from "@/config/site";
import { mutateTitle } from "@/utils/medias";
import { NextPage } from "next";
import { Params } from "@/types";
import MoreLike from "@/components/layouts/more-like";
import { Movie } from "tmdb-ts";

const MovieDetailPage: NextPage<Params<{ id: number }>> = ({ params }) => {
  const { id } = use(params);
  const router = useRouter();
  const watchRef = useRef<HTMLDivElement | null>(null);
  const {
    data: movies,
    isPending,
    error,
  } = useQuery({
    queryKey: ["movie-detail", id],
    queryFn: () => tmdb.movies.details(id, ["credits", "recommendations", "release_dates"]),
  });

  useDocumentTitle(`${movies?.title} | ${siteConfig.name}`);

  if (error) notFound();

  if (isPending) {
    return <Spinner size="lg" variant="wave" className="absolute-center" />;
  }

  return (
    <main>
      <Suspense fallback={<Spinner size="lg" variant="wave" className="absolute-center" />}>
        <Topbar
          isDetail
          title={mutateTitle(movies)}
          Ref={watchRef}
          onClick={() => router.push(`/watch/${movies.id}-${kebabCase(movies.title)}`)}
        />
        <Billboard media={movies} />
        <Content variant="primary">
          <div className="tablet:mx-5">
            <Showcase
              isMediaSelected
              data={movies}
              mediaType="movie"
              favorite={movies}
              casts={movies.credits.cast}
            />
          </div>
          <Content isSpacerOnly>
            <section className="mt-5">
              <div ref={watchRef}>
                <Tabs
                  classNames={{
                    tabList:
                      "tablet:justify-start justify-center w-full border-b border-divider p-0 gap-3 relative",
                    tab: "w-full tablet:w-1/4 max-w-[640px]",
                    tabContent: "group-data-[selected=true]:font-bold",
                    base: "w-full",
                    cursor: "w-full bg-blue-primary",
                  }}
                  variant="underlined"
                >
                  <Tab key="more" title="More Like This">
                    <div className="tablet:ml-5">
                      <MoreLike data={movies.recommendations.results as Movie[]} />
                    </div>
                  </Tab>
                </Tabs>
              </div>
            </section>
          </Content>
        </Content>
      </Suspense>
    </main>
  );
};

export default MovieDetailPage;

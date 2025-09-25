"use client";

import { Params } from "@/types";
import { Suspense, use, useRef } from "react";
import { notFound } from "next/navigation";
import { tmdb } from "@/services/api/tmdb";
import { useDocumentTitle } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import { NextPage } from "next";
import { siteConfig } from "@/config/site";
import { Spinner, Tab, Tabs } from "@heroui/react";
import Topbar from "@/components/sections/topbar";
import { kebabCase } from "string-ts";
import Billboard from "@/components/sections/billboard";
import Content from "@/components/layouts/content";
import Showcase from "@/components/sections/showcase";
import { TV } from "tmdb-ts";
import MoreLike from "@/components/layouts/more-like";
import Seasons from "@/components/layouts/seasons";
import { useRouter } from "@bprogress/next/app";

const SeriesDetailPage: NextPage<Params<{ id: number }>> = ({ params }) => {
  const { id } = use(params);
  const watchRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  const {
    data: series,
    isPending,
    error,
  } = useQuery({
    queryKey: ["series-detail", id],
    queryFn: () => tmdb.tvShows.details(id, ["credits", "recommendations", "content_ratings"]),
  });

  const title = series?.original_language === "id" ? series.original_name : series?.name;

  useDocumentTitle(`${series?.name} | ${siteConfig.name}`);

  if (error) notFound();

  if (isPending) {
    return <Spinner size="lg" variant="wave" className="absolute-center" />;
  }

  return (
    <main>
      <Suspense fallback={<Spinner size="lg" variant="wave" className="absolute-center" />}>
        <Topbar
          isDetail
          title={title}
          Ref={watchRef}
          onClick={() =>
            router.push(`/premier/series/${series.id}-${kebabCase(series.name)}/watch`)
          }
        />
      </Suspense>
      <Billboard media={series} />
      <Content variant="primary">
        <div className="tablet:mx-5">
          <Showcase
            isMediaSelected
            data={series}
            mediaType="tv"
            casts={series.credits.cast}
            favorite={series}
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
                {series && (
                  <Tab key="episodes" title="Episodes">
                    <div className="tablet:ml-5">
                      <Seasons id={id} seasons={series.seasons} />
                    </div>
                  </Tab>
                )}
                <Tab key="more" title="More Like This">
                  <div className="tablet:ml-5">
                    <MoreLike data={series.recommendations.results as unknown as TV[]} />
                  </div>
                </Tab>
              </Tabs>
            </div>
          </section>
        </Content>
      </Content>
    </main>
  );
};

export default SeriesDetailPage;

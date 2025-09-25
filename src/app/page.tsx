"use client";

import Content from "@/components/layouts/content";
import HomeList from "@/components/layouts/home-list";
import Billboard from "@/components/sections/billboard";
import Showcase from "@/components/sections/showcase";
import { tmdb } from "@/services/api/tmdb";
import { siteConfig } from "@/config/site";
import { Spinner } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import { Suspense } from "react";
import { MovieWithMediaType, TVWithMediaType } from "tmdb-ts";

export default function Home() {
  const { data } = useQuery({
    queryKey: ["spotlightMedia"],
    queryFn: () => tmdb.trending.trending("all", "day"),
  });
  const mediaItems = data?.results.filter(
    (item): item is MovieWithMediaType | TVWithMediaType =>
      item.media_type === "movie" || item.media_type === "tv",
  );

  const spotlightMedia = mediaItems?.[Math.floor(Math.random() * mediaItems.length)];
  const collections = siteConfig.queryLists.media;

  return (
    <>
      {spotlightMedia ? (
        <>
          <Billboard media={spotlightMedia} />
          <Content variant="primary">
            <Showcase
              data={spotlightMedia}
              mediaType={spotlightMedia.media_type}
              isMediaSelected={false}
            />
            <Content isSpacerOnly>
              <div className="tablet:pb-0 space-y-8 pb-20">
                {collections.map(({ name, params, query, media_type }) => (
                  <Suspense key={name}>
                    <HomeList name={name} query={query} params={params} mediaType={media_type} />
                  </Suspense>
                ))}
              </div>
            </Content>
          </Content>
        </>
      ) : (
        <Spinner size="lg" variant="wave" className="absolute-center" />
      )}
    </>
  );
}

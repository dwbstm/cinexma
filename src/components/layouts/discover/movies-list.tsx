"use client";

import { Skeleton, Spinner } from "@heroui/react";
import { memo, useEffect, useRef } from "react";
import FetchDiscoverMovies from "@/services/api/FetchDiscoverMovies";
import { formatString } from "@/utils/medias";
import { useDocumentTitle, useInViewport } from "@mantine/hooks";
import { siteConfig } from "@/config/site";
import { cn } from "@/utils/helpers";
import { useInfiniteQuery } from "@tanstack/react-query";
import useDiscoverFilters from "@/hooks/useDiscoverFilters";
import { notFound } from "next/navigation";
import Topbar from "@/components/sections/topbar";
import Filter from "@/components/sections/filter";
import Loop from "@/components/elements/loop";
import Card from "@/components/sections/collection/portrait/card";
import { MoviesFetchQueryType } from "@/types/media";

const MoviesList = () => {
  const { ref, inViewport } = useInViewport();

  const { genresString, queryType, country, year, companies } = useDiscoverFilters();

  const { data, isPending, status, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: [`${queryType}-movies`, genresString, country, year],
      queryFn: ({ pageParam }) =>
        FetchDiscoverMovies({
          page: pageParam,
          type: queryType as MoviesFetchQueryType,
          genres: genresString,
          country: country,
          year: Number(year),
          without_companies: companies,
        }),
      initialPageParam: 1,
      getNextPageParam: (lastPage) =>
        lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
    });

  const Ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (inViewport && !isPending) {
      fetchNextPage();
    }
  }, [fetchNextPage, inViewport, isPending]);

  useDocumentTitle(`Movies | ${siteConfig.name}`);

  if (status === "error") return notFound();

  return (
    <main className="mx-3">
      <div className="tablet:hidden">
        <Topbar Ref={Ref} title={`${formatString(queryType)} Movies`} />
      </div>
      <h1 className="tablet:text-4xl tablet:mb-8 mb-3 pt-[100px] text-center text-2xl font-bold">{`${formatString(queryType)} Movies`}</h1>
      {queryType === "discover" && <Filter />}

      {isPending ? (
        <section
          className={cn(
            `desktop:grid-cols-7 laptop:grid-cols-6 tablet:grid-cols-5 tablet:mr-5 grid grid-cols-3 gap-3 pb-[90px] ${queryType === "discover" ? "pt-5" : "pt-0"}`,
          )}
        >
          <Loop count={20}>
            <Skeleton className="aspect-[0.667] w-full rounded-xl" />
          </Loop>
        </section>
      ) : (
        <section
          ref={Ref}
          className={cn(
            `desktop:grid-cols-7 laptop:grid-cols-6 tablet:grid-cols-5 tablet:mr-5 grid grid-cols-3 gap-3 pb-5 ${queryType === "discover" ? "pt-5" : "pt-0"}`,
          )}
        >
          {data?.pages.map((val) => {
            return val.results.map((movie) => {
              return <Card key={movie.id} media={movie} mediaType="movie" />;
            });
          })}
        </section>
      )}
      <div ref={ref} className="tablet:pb-10 flex h-10 items-center justify-center pb-36">
        {isFetchingNextPage && <Spinner size="lg" variant="wave" />}
        {!hasNextPage && !isPending && (
          <p className="text-muted-foreground text-center text-base">
            You have reached the end of the list.
          </p>
        )}
      </div>
    </main>
  );
};

export default memo(MoviesList);

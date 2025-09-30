"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Input, Pagination, Skeleton } from "@heroui/react";
import { tmdb } from "@/services/api/tmdb";
import { useDebouncedValue, useLocalStorage } from "@mantine/hooks";
import { AnimatePresence, motion } from "framer-motion";
import { useQueryState, parseAsInteger, parseAsString } from "nuqs";
import clsx from "clsx";
import History from "../elements/history";
import SearchInput from "../elements/input/search";
import Loop from "../elements/loop";
import Card from "../sections/collection/portrait/card";
import { TrendingVideo } from "@/types/media";

export default function SearchList() {
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useQueryState("query", parseAsString.withDefault(""));
  const [isSearchTriggered, setIsSearchTriggered] = useState(false);
  const [debouncedSearchQuery] = useDebouncedValue(searchQuery.trim(), 1000);
  const [searchHistories, setSearchHistories] = useLocalStorage<string[]>({
    key: "search-histories",
    defaultValue: [],
    getInitialValueInEffect: false,
  });
  const { data, isPending } = useQuery({
    queryFn: () => tmdb.search.multi({ query: debouncedSearchQuery, page: page }),
    queryKey: ["search-movie", page, debouncedSearchQuery],
  });

  const movies = data?.results as TrendingVideo[];

  const totalResults = data?.total_results as number;

  useEffect(() => {
    setTotalPages(data?.total_pages ?? totalPages);
  }, [data?.total_pages!]);

  const handlePageChange = (newPage: number) => {
    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
    setPage(newPage);
  };

  useEffect(() => {
    if (debouncedSearchQuery) {
      setIsSearchTriggered(true);
      setPage(1);
      if (!searchHistories.includes(debouncedSearchQuery)) {
        setSearchHistories([...searchHistories, debouncedSearchQuery].sort());
      }
    } else {
      setIsSearchTriggered(false);
      setPage(1);
    }
  }, [debouncedSearchQuery]);

  return (
    <main className="mx-3 pt-[50px]">
      <div className="flex flex-col items-center">
        <AnimatePresence>
          <div
            className={clsx("flex w-full max-w-xl flex-col justify-center gap-3 text-center", {
              "absolute px-3 md:px-0": !isSearchTriggered,
            })}
          >
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.7 }}
              exit={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <SearchInput
                isClearable
                placeholder="Search your favorite movies and series..."
                isLoading={isPending && isSearchTriggered}
                autoFocus
                value={searchQuery}
                onClear={() => setSearchQuery("")}
                onChange={({ target }) => setSearchQuery(target.value)}
              />
            </motion.div>
            <History
              searchHistories={searchHistories}
              setSearchQuery={setSearchQuery}
              setSearchHistories={setSearchHistories}
            />
          </div>
        </AnimatePresence>
      </div>

      {isSearchTriggered && (
        <>
          {isPending ? (
            <section className="desktop:grid-cols-7 laptop:grid-cols-6 tablet:grid-cols-5 tablet:mr-5 mt-5 grid grid-cols-3 gap-3">
              <Loop count={20}>
                <Skeleton className="aspect-[0.667] w-full rounded-xl" />
              </Loop>
            </section>
          ) : (
            <>
              <div className="mt-5 text-center">
                {totalResults === 0 && searchQuery && (
                  <span>
                    No movies and series was found with query{" "}
                    <span className="text-warning font-bold">"{debouncedSearchQuery}"</span>
                  </span>
                )}
              </div>
              {movies.length > 0 && (
                <div className="desktop:grid-cols-7 laptop:grid-cols-6 tablet:grid-cols-5 grid grid-cols-3 gap-3">
                  {movies.map((movie) => (
                    <Card mediaType="all" key={movie.id} media={movie} />
                  ))}
                </div>
              )}
            </>
          )}
          {totalResults !== 0 && (
            <section className="tablet:pb-5 mt-5 flex justify-center pb-[90px]">
              <Pagination
                size="sm"
                showControls
                isDisabled={isPending}
                total={totalPages}
                page={page}
                onChange={handlePageChange}
              />
            </section>
          )}
        </>
      )}
    </main>
  );
}

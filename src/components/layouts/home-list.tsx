"use client";

import { useQuery } from "@tanstack/react-query";
import { kebabCase } from "string-ts";
import { Movie, TV } from "tmdb-ts";
import Collection from "../sections/collection";

interface HomeListProps {
  query: Promise<{
    page: number;
    results: Movie[] | TV[];
    total_results: number;
    total_pages: number;
  }>;
  name: string;
  params: string;
  mediaType: string;
}

const HomeList: React.FC<HomeListProps> = ({ query, name, params, mediaType }) => {
  const key = kebabCase(name) + "-list";
  const { data } = useQuery({
    queryFn: () => query,
    queryKey: [key],
  });

  return (
    <>
      {mediaType === "movie" ? (
        <Collection.Portrait data={data?.results as Movie[]} title={name} params={params} />
      ) : (
        <Collection.Landscape
          data={data?.results as unknown as TV[]}
          title={name}
          params={params}
        />
      )}
    </>
  );
};

export default HomeList;

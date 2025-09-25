"use client";

import { tmdb } from "@/services/api/tmdb";
import { MoviesFetchQueryType } from "@/types/media";
import { MovieDiscoverResult } from "tmdb-ts";

const yearNow = new Date().getFullYear();

interface FetchMovies {
  page?: number;
  type?: MoviesFetchQueryType;
  genres?: string;
  country?: string;
  year?: number;
  without_companies?: string;
}

const FetchDiscoverMovies = ({
  page = 1,
  type = "discover",
  genres,
  country,
  year,
  without_companies,
}: FetchMovies): Promise<MovieDiscoverResult> => {
  const discover = () =>
    tmdb.discover.movie({
      page: page,
      with_genres: genres,
      with_original_language: country,
      primary_release_year: year,
      without_companies: without_companies,
    });
  const forYou = () => tmdb.trending.trending("movie", "day", { page: page });
  const latestIndonesia = () =>
    tmdb.discover.movie({
      page: page,
      with_original_language: "id",
      primary_release_year: yearNow,
      without_companies: "198702",
    });
  const newCinexma = () =>
    tmdb.discover.movie({
      with_watch_providers: "8",
      watch_region: "ID",
      page: page,
    });

  const queryMap: Record<MoviesFetchQueryType, () => Promise<MovieDiscoverResult>> = {
    discover,
    "for-you": forYou,
    "latest-indonesia": latestIndonesia,
    "new-cinexma": newCinexma,
  };

  const queryData = queryMap[type];

  return queryData();
};

export default FetchDiscoverMovies;

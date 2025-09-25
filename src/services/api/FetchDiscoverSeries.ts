"use client";

import { tmdb } from "@/services/api/tmdb";
import { SeriesFetchQueryType } from "@/types/media";
import { TvShowDiscoverResult } from "tmdb-ts";

const yearNow = new Date().getFullYear();

interface FetchSeries {
  page?: number;
  type?: SeriesFetchQueryType;
  genres?: string;
  country?: string;
  year?: number;
}

const FetchDiscoverSeries = ({
  page = 1,
  type = "discover",
  genres,
  country,
  year,
}: FetchSeries): Promise<TvShowDiscoverResult> => {
  const discover = () =>
    tmdb.discover.tvShow({
      page: page,
      with_genres: genres,
      with_original_language: country,
      first_air_date_year: year,
    });
  const showsYouMightLike = () =>
    tmdb.discover.tvShow({
      page: page,
      sort_by: "popularity.desc",
    });
  const koreanMightLike = () =>
    tmdb.discover.tvShow({
      page: page,
      with_genres: "18,35",
      with_original_language: "ko",
      with_watch_providers: "8",
      watch_region: "ID",
    });
  const NewlyReleased = () =>
    tmdb.discover.tvShow({
      page: page,
      first_air_date_year: yearNow,
      with_watch_providers: "158,489",
      watch_region: "ID",
    });

  const queryMap: Record<SeriesFetchQueryType, () => Promise<TvShowDiscoverResult>> = {
    discover,
    "shows-you-might-like": showsYouMightLike,
    "korean-dramas-you-might-like": koreanMightLike,
    "newly-released": NewlyReleased,
  };

  const queryData = queryMap[type];

  return queryData();
};

export default FetchDiscoverSeries;

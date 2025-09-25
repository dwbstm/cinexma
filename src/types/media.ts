import { Movie, TV } from "tmdb-ts";

export type MediaType = "movie" | "tv" | "all";

export interface TrendingVideo extends Movie, TV {
  media_type: "movie" | "tv";
}

export const MOVIES_VALID_QUERY_TYPES = [
  "discover",
  "for-you",
  "latest-indonesia",
  "new-cinexma",
] as const;
export type MoviesFetchQueryType = (typeof MOVIES_VALID_QUERY_TYPES)[number];

export const SERIES_VALID_QUERY_TYPES = [
  "discover",
  "shows-you-might-like",
  "korean-dramas-you-might-like",
  "newly-released",
] as const;

export type SeriesFetchQueryType = (typeof SERIES_VALID_QUERY_TYPES)[number];

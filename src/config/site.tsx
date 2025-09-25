import { tmdb } from "../services/api/tmdb";
const year = new Date().getFullYear();

export const siteConfig = {
  name: "Cinexma",
  description: "Your only choice for a free movies and series streaming website.",
  favicon: "/favicon.ico",
  queryLists: {
    media: [
      {
        name: "Shows You Might Like",
        query: tmdb.discover.tvShow({
          sort_by: "popularity.desc",
        }),
        params: "shows-you-might-like",
        media_type: "tv",
      },
      {
        name: "For You",
        query: tmdb.trending.trending("movie", "week"),
        params: "for-you",
        media_type: "movie",
      },
      {
        name: "New to Cinexma",
        query: tmdb.discover.movie({ with_watch_providers: "8", watch_region: "ID" }),
        params: "new-cinexma",
        media_type: "movie",
      },
      {
        name: "Newly Released",
        query: tmdb.discover.tvShow({
          first_air_date_year: year,
          with_watch_providers: "158,489",
          watch_region: "ID",
        }),
        params: "newly-released",
        media_type: "tv",
      },
      {
        name: "Korean Dramas You Might Like",
        query: tmdb.discover.tvShow({
          with_genres: "18,35",
          with_original_language: "ko",
          with_watch_providers: "8",
          watch_region: "ID",
        }),
        params: "korean-dramas-you-might-like",
        media_type: "tv",
      },
      {
        name: "Latest in Indonesia",
        query: tmdb.discover.movie({
          with_original_language: "id",
          primary_release_year: year,
        }),
        params: "latest-indonesia",
        media_type: "movie",
      },
    ],
  },
};

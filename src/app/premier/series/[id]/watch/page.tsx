"use client";

import { tmdb } from "@/services/api/tmdb";
import { Spinner } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import { notFound, useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import { NextPage } from "next";
import { Params } from "@/types";
import { use } from "react";
const Player = dynamic(() => import("@/components/sections/player/series-player"));

const SeriesWatchPage: NextPage<Params<{ id: number }>> = ({ params }) => {
  const { id } = use(params);
  const searchParams = useSearchParams();

  const seasonParam = searchParams.get("season");
  const episodeParam = searchParams.get("episode");

  const season = seasonParam ? Number(seasonParam) : 1;
  const episode = episodeParam ? Number(episodeParam) : 1;

  const {
    data: series,
    isPending: isPendingTv,
    error: errorTv,
  } = useQuery({
    queryFn: () => tmdb.tvShows.details(id),
    queryKey: ["series-player-details", id],
  });

  const {
    data: seasonDetail,
    isPending: isPendingSeason,
    error: errorSeason,
  } = useQuery({
    queryFn: () => tmdb.tvShows.season(id, season),
    queryKey: ["series-season", id, season, episode],
    gcTime: 1000,
  });

  if (isPendingTv || isPendingSeason) {
    return <Spinner size="lg" className="absolute-center" variant="wave" />;
  }

  const EPISODE = seasonDetail?.episodes.find((e) => e.episode_number === episode);
  const title = series?.original_language === "id" ? series.original_name : series?.name;

  if (!EPISODE || errorTv || errorSeason) {
    return notFound();
  }

  const isNotReleased = new Date(EPISODE.air_date) > new Date();

  if (isNotReleased) {
    return notFound();
  }

  const currentEpisodeIndex = seasonDetail.episodes.findIndex(
    (e) => e.episode_number === EPISODE.episode_number,
  );

  const nextEpisodeNumber =
    currentEpisodeIndex < seasonDetail.episodes.length - 1
      ? new Date(seasonDetail.episodes[currentEpisodeIndex + 1].air_date) > new Date()
        ? null
        : seasonDetail.episodes[currentEpisodeIndex + 1].episode_number
      : null;

  const prevEpisodeNumber =
    currentEpisodeIndex > 0 ? seasonDetail.episodes[currentEpisodeIndex - 1].episode_number : null;

  return (
    <Player
      series={series}
      id={id}
      seriesName={title!}
      seasonName={seasonDetail.name}
      episode={EPISODE}
      episodes={seasonDetail?.episodes}
      nextEpisodeNumber={nextEpisodeNumber}
      prevEpisodeNumber={prevEpisodeNumber}
    />
  );
};

export default SeriesWatchPage;

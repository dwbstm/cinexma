"use client";

import { tmdb } from "@/services/api/tmdb";
import { Params } from "@/types";
import { isEmpty } from "@/utils/helpers";
import { Spinner } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import { NextPage } from "next";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import { use } from "react";
const Player = dynamic(() => import("@/components/sections/player/movie-player"));

const WatchPage: NextPage<Params<{ id: number }>> = ({ params }) => {
  const { id } = use(params);

  const {
    data: movie,
    isPending,
    error,
  } = useQuery({
    queryFn: () => tmdb.movies.details(id),
    queryKey: ["movie-player-detail", id],
  });

  if (isPending) {
    return <Spinner size="lg" className="absolute-center" variant="wave" />;
  }

  if (error || isEmpty(movie)) return notFound();

  return <Player movie={movie} />;
};

export default WatchPage;

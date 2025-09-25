"use client";

import { MovieWithMediaType, TVWithMediaType, Video } from "tmdb-ts";
import Backdrop from "./backdrop";
import { tmdb } from "@/services/api/tmdb";
import Playback from "./playback";
import { useQuery } from "@tanstack/react-query";

interface BillboardProps {
  media: Partial<MovieWithMediaType> | Partial<TVWithMediaType>;
}

interface TrailerProps {
  videos: {
    results: Video[];
  };
}

const Billboard: React.FC<BillboardProps> = ({ media }) => {
  const id = media.id;

  const { data } = useQuery<TrailerProps>({
    queryKey: ["billboard", media.media_type, id],
    queryFn: () =>
      media.media_type === "movie"
        ? tmdb.movies.details(id!, ["videos"])
        : tmdb.tvShows.details(id!, ["videos"]),
    enabled: !!id && !!media.media_type,
  });

  const trailer = data?.videos.results.filter((val) => val.type === "Trailer");
  const hasTrailer = trailer && trailer.length > 0;

  return (
    <section className="tablet:top-0 sticky -z-10 aspect-video max-h-screen w-full overflow-hidden">
      <div className="relative h-full w-full">
        {hasTrailer && (
          <Playback
            src={`https://www.youtube.com/embed/${trailer[0].key}?autoplay=1&mute=1&loop=1&controls=0&playlist=${trailer[0].key}`}
          />
        )}

        {media.backdrop_path && (
          <Backdrop src={media.backdrop_path} isAlwaysDisplayed={!hasTrailer} />
        )}
        <div className="from-background-dark tablet:block absolute inset-0 z-10 hidden bg-gradient-to-r to-transparent" />
        <div className="from-background-dark absolute inset-0 z-10 bg-gradient-to-t to-transparent" />
        <div className="from-background-dark absolute inset-0 z-10 bg-gradient-to-t to-transparent" />
      </div>
    </section>
  );
};

export default Billboard;

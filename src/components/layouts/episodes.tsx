import useBreakpoints from "@/hooks/useBreakpoints";
import { tmdb } from "@/services/api/tmdb";
import { cn } from "@/utils/helpers";
import { getImageUrl, runtimeDuration } from "@/utils/medias";
import { Card, CardBody, Chip, Image, Spinner } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { Play } from "iconoir-react";
import Link from "next/link";
import { memo } from "react";
import { Episode } from "tmdb-ts/dist/types/tv-episode";

interface EpisodesSelectionProps {
  id: number;
  seasonNumber: number;
}

interface EpisodeCardProps {
  id: number;
  episode: Episode;
  order?: number;
  withAnimation?: boolean;
}

const EpisodesSelection: React.FC<EpisodesSelectionProps> = ({ id, seasonNumber }) => {
  const { data, isPending } = useQuery({
    queryFn: () => tmdb.tvShows.season(id, seasonNumber),
    queryKey: ["series-episodes", id, seasonNumber],
    gcTime: 1000,
  });

  if (isPending) {
    return (
      <div className="flex h-full items-center justify-center pt-10">
        <Spinner variant="wave" size="lg" />
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="desktop:grid-cols-2 laptop:grid-cols-2 tablet:grid-cols-2 tablet:mr-5 grid grid-cols-1 gap-3">
      {data.episodes.map((episode, index) => (
        <EpisodeCard key={episode.id} episode={episode} order={index + 1} id={id} />
      ))}
    </div>
  );
};

export const EpisodeCard: React.FC<EpisodeCardProps> = ({
  episode,
  order = 1,
  id,
  withAnimation = true,
}) => {
  const imageUrl = getImageUrl(episode.still_path);
  const { mobile } = useBreakpoints();
  const isNotReleased = !episode.air_date || new Date(episode.air_date) > new Date();
  const isOdd = order % 2 !== 0;
  const href = !isNotReleased
    ? `/premier/series/${id}/watch?season=${episode.season_number}&episode=${episode.episode_number}`
    : undefined;

  return (
    <Card
      isPressable={!isNotReleased}
      as={(isNotReleased ? "div" : Link) as "a"}
      href={href}
      shadow="none"
      className={cn(
        "group motion-preset-blur-right motion-duration-300 grid grid-cols-[auto_3fr] gap-3 border-2 border-zinc-600 bg-black transition-colors",
        {
          "hover:border-blue-primary hover:bg-background-dark": !isNotReleased,
          "cursor-not-allowed opacity-50": isNotReleased,
          "motion-preset-slide-left": isOdd && withAnimation,
          "motion-preset-slide-right": !isOdd && withAnimation,
        },
      )}
    >
      <div className="relative">
        <Image
          alt={episode.name}
          src={imageUrl}
          height={120}
          width={mobile ? 180 : 220}
          className="rounded-r-none object-cover"
        />
        {!isNotReleased && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="tablet:group-hover:opacity-100 tablet:opacity-0 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-black/35 opacity-100 backdrop-blur-xs transition-opacity">
              <Play className="h-6 w-6 text-white" />
            </div>
          </div>
        )}
        <Chip
          size="sm"
          color={isNotReleased ? "warning" : undefined}
          variant={isNotReleased ? "shadow" : undefined}
          className={cn("absolute top-2 right-2 z-20", {
            "bg-black/35 backdrop-blur-xs": !isNotReleased,
          })}
        >
          {isNotReleased ? "Coming Soon" : runtimeDuration(episode.runtime)}
        </Chip>
        <Chip
          size="sm"
          className="absolute bottom-2 left-2 z-20 min-w-9 bg-black/35 text-center text-white backdrop-blur-xs"
        >
          {episode.episode_number}
        </Chip>
      </div>
      <CardBody className="flex space-y-1">
        <p
          title={episode.name}
          className={cn(
            "tablet:text-xl line-clamp-1 font-semibold transition-colors",
            !isNotReleased && "group-hover:text-blue-primary",
          )}
        >
          {episode.name}
        </p>
        <p className="text-content4-foreground line-clamp-1 text-xs">
          {format(episode.air_date, "dd MMMM yyyy")}
        </p>
        <p className="tablet:text-sm text-foreground-500 line-clamp-2 text-xs">
          {episode.overview}
        </p>
      </CardBody>
    </Card>
  );
};

export default memo(EpisodesSelection);

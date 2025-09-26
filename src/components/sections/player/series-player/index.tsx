import { siteConfig } from "@/config/site";
import { cn } from "@/utils/helpers";
import { getSeriesPlayers } from "@/utils/players";
import { Card, Skeleton } from "@heroui/react";
import { useDisclosure, useDocumentTitle, useIdle } from "@mantine/hooks";
import dynamic from "next/dynamic";
import { parseAsInteger, useQueryState } from "nuqs";
import { memo, useMemo } from "react";
import { Episode, TvShowDetails } from "tmdb-ts";
const Header = dynamic(() => import("./header"));
const SourceSelection = dynamic(() => import("./source-selection"));
const EpisodeSelection = dynamic(() => import("./episode-selection"));

export interface SeriesPlayerProps {
  series: TvShowDetails;
  id: number;
  seriesName: string;
  seasonName: string;
  episode: Episode;
  episodes: Episode[];
  nextEpisodeNumber: number | null;
  prevEpisodeNumber: number | null;
}

const TvShowPlayer: React.FC<SeriesPlayerProps> = ({ id, episode, episodes, ...props }) => {
  const players = getSeriesPlayers(id, episode.season_number, episode.episode_number);
  const idle = useIdle(3000);
  const [sourceOpened, sourceHandlers] = useDisclosure(false);
  const [episodeOpened, episodeHandlers] = useDisclosure(false);
  const [selectedSource, setSelectedSource] = useQueryState<number>(
    "source",
    parseAsInteger.withDefault(0),
  );

  const [selectedEpisodeNumber, setSelectedEpisodeNumber] = useQueryState<number>(
    "episode",
    parseAsInteger.withDefault(1),
  );

  useDocumentTitle(
    `Play ${props.seriesName} - ${props.seasonName} - ${episode.name} | ${siteConfig.name}`,
  );

  const handlePreviousEpisode = () => {
    if (props.prevEpisodeNumber != null) {
      setSelectedEpisodeNumber(props.prevEpisodeNumber);
    }
  };
  const handleNextEpisode = () => {
    if (props.nextEpisodeNumber != null) {
      setSelectedEpisodeNumber(props.nextEpisodeNumber);
    }
  };

  const PLAYER = useMemo(() => players[selectedSource] || players[0], [players, selectedSource]);

  return (
    <>
      <div className={cn("relative overflow-hidden")}>
        <Header
          id={id}
          episode={episode}
          hidden={idle}
          selectedSource={selectedSource}
          onOpenSource={sourceHandlers.open}
          onOpenEpisode={episodeHandlers.open}
          onNextEpisode={handleNextEpisode}
          onPreviousEpisode={handlePreviousEpisode}
          {...props}
        />

        <Card shadow="md" radius="none" className="relative h-screen">
          <Skeleton className="absolute h-full w-full" />
          <iframe
            allowFullScreen
            key={PLAYER.title}
            src={PLAYER.source}
            referrerPolicy="origin"
            className={cn("z-10 h-full", { "pointer-events-none": idle })}
          />
        </Card>
      </div>
      <SourceSelection
        opened={sourceOpened}
        onClose={sourceHandlers.close}
        players={players}
        selectedSource={selectedSource}
        setSelectedSource={setSelectedSource}
      />
      <EpisodeSelection
        id={id}
        opened={episodeOpened}
        onClose={episodeHandlers.close}
        episodes={episodes}
      />
    </>
  );
};

export default memo(TvShowPlayer);

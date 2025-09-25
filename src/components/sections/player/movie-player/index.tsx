import { siteConfig } from "@/config/site";
import { cn } from "@/utils/helpers";
import { mutateTitle } from "@/utils/medias";
import { getMoviesPlayers } from "@/utils/players";
import { Card, Skeleton } from "@heroui/react";
import { useDisclosure, useDocumentTitle, useIdle } from "@mantine/hooks";
import dynamic from "next/dynamic";
import { parseAsInteger, useQueryState } from "nuqs";
import { useMemo } from "react";
import { MovieDetails } from "tmdb-ts/dist/types/movies";
const Header = dynamic(() => import("./header"));
const SourceSelection = dynamic(() => import("./source-selection"));

interface PlayerProps {
  movie: MovieDetails;
}

const Player: React.FC<PlayerProps> = ({ movie }) => {
  const players = getMoviesPlayers(movie.id);
  const title = mutateTitle(movie);
  const idle = useIdle(3000);
  const [opened, handlers] = useDisclosure(false);
  const [selectedSource, setSelectedSource] = useQueryState<number>(
    "source",
    parseAsInteger.withDefault(0),
  );

  useDocumentTitle(`Watch ${title} | ${siteConfig.name}`);

  const player = useMemo(() => players[selectedSource] || players[0], [players, selectedSource]);

  return (
    <>
      <div className="relative overflow-hidden">
        <Header movieName={title} onOpenSource={handlers.open} hidden={idle} />
        <Card radius="none" className="relative h-screen">
          <Skeleton className="absolute h-full w-full" />
          <iframe
            allowFullScreen
            key={player.title}
            src={player.source}
            className={cn("z-10 h-screen w-screen", { "pointer-events-none": idle })}
          />
        </Card>
      </div>

      <SourceSelection
        opened={opened}
        onClose={handlers.close}
        players={players}
        selectedSource={selectedSource}
        setSelectedSource={setSelectedSource}
      />
    </>
  );
};

Player.displayName = "Player";

export default Player;

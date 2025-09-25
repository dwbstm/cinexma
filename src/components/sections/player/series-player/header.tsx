"use client";

import { cn } from "@/utils/helpers";
import {
  NavArrowLeft,
  PlaylistPlay,
  ServerSolid,
  SkipNextSolid,
  SkipPrevSolid,
} from "iconoir-react";
import ActionButton from "@/components/elements/button/action-button";
import { SeriesPlayerProps } from ".";
import { useRouter } from "@bprogress/next/app";

interface HeaderProps extends Omit<SeriesPlayerProps, "episodes" | "series"> {
  hidden?: boolean;
  selectedSource: number;
  onOpenSource: () => void;
  onOpenEpisode: () => void;
  onNextEpisode: () => void;
  onPreviousEpisode: () => void;
}

const Header: React.FC<HeaderProps> = ({
  seriesName,
  seasonName,
  episode,
  hidden,
  nextEpisodeNumber,
  prevEpisodeNumber,
  onOpenSource,
  onOpenEpisode,
  onNextEpisode,
  onPreviousEpisode,
}) => {
  const router = useRouter();
  return (
    <>
      <section
        aria-hidden={hidden ? true : undefined}
        className={cn(
          "absolute top-28 z-50 flex w-full transform items-start justify-between gap-4",
          "tablet:px-8 px-3 text-white transition-opacity",
          { "opacity-0": hidden },
        )}
      >
        <button
          onClick={() => router.back()}
          className="cursor-pointer rounded-full bg-zinc-800 p-1"
        >
          <NavArrowLeft width={24} height={24} />
        </button>
        <div className="tablet:flex tablet:top-0 tablet:items-center tablet:gap-6 tablet:static absolute -top-14 left-[90%] grid gap-8">
          <ActionButton
            disabled={!prevEpisodeNumber}
            label="Previous Episode"
            tooltip="Previous Episode"
            onClick={onPreviousEpisode}
          >
            <SkipPrevSolid className="tablet:size-8" />
          </ActionButton>
          <ActionButton
            disabled={!nextEpisodeNumber}
            label="Next Episode"
            tooltip="Next Episode"
            onClick={onNextEpisode}
          >
            <SkipNextSolid className="tablet:size-8" />
          </ActionButton>
          <ActionButton label="Sources" tooltip="Sources" onClick={onOpenSource}>
            <ServerSolid className="tablet:size-8" />
          </ActionButton>
          <ActionButton label="Episodes" tooltip="Episodes" onClick={onOpenEpisode}>
            <PlaylistPlay className="tablet:size-8" />
          </ActionButton>
        </div>
      </section>

      <section
        aria-hidden={hidden ? true : undefined}
        className={cn(
          "absolute top-10 z-50 flex w-full",
          "tablet:px-5 px-3 text-white transition-opacity",
          { "opacity-0": hidden },
        )}
      >
        <div className="absolute left-1/2 flex -translate-x-1/2 flex-col justify-center text-center">
          <h2 className="text-shadow-background-dark tablet:text-xl font-semibold text-shadow-sm">
            {seriesName}
          </h2>
          <p className="text-xs text-gray-200 text-shadow-lg sm:text-sm lg:text-base">
            {seasonName} - {episode.name}
          </p>
        </div>
      </section>
    </>
  );
};

export default Header;

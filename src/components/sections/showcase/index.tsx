"use client";

import Button from "@/components/elements/button";
import { tmdb } from "@/services/api/tmdb";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "@bprogress/next/app";
import { kebabCase } from "string-ts";
import { Cast, Image as ImageType, ReleaseDate, MovieDetails, TvShowDetails } from "tmdb-ts";
import FavoriteButton from "@/components/elements/button/favorite-button";

import { MediaType } from "@/types/media";
import { toUrlSlugWithEncoding } from "@/utils/helpers";
import Logo from "./logo";
import Details from "./details";
import Overview from "./overview";

interface ShowcaseMovie {
  images: {
    logos: ImageType[];
  };
  release_dates: {
    results: { iso_3166_1: string; release_dates: ReleaseDate[] }[];
  };
  runtime: number;
}

interface ShowcaseTV {
  images: {
    logos: ImageType[];
  };
  content_ratings: {
    results: { iso_3166_1: string; rating: string }[];
  };
  number_of_seasons: number;
}

type ShowcaseMediaProps = ShowcaseMovie | ShowcaseTV;

type favoriteProps = Partial<MovieDetails> | Partial<TvShowDetails>;

interface ShowcaseProps {
  data: Partial<MovieDetails> & Partial<TvShowDetails>;
  mediaType?: MediaType;
  favorite?: favoriteProps;
  casts?: Cast[];
  isMediaSelected: boolean;
}

const Showcase: React.FC<ShowcaseProps> = ({
  data,
  mediaType,
  isMediaSelected,
  casts,
  favorite,
}) => {
  const id = data.id!;

  const { data: showcase } = useQuery<ShowcaseMediaProps>({
    queryKey: ["showcase", id],
    queryFn: () =>
      mediaType === "movie"
        ? tmdb.movies.details(id, ["images", "release_dates"])
        : tmdb.tvShows.details(id, ["images", "content_ratings"]),
  });

  const router = useRouter();

  return (
    <main className="tablet:max-w-md space-y-6">
      {/* Logo */}
      <Logo data={data} showcase={showcase!} />

      <div className="space-y-3">
        {/* Details */}
        <Details mediaType={mediaType!} showcase={showcase!} data={data!} />

        {/* Overview */}
        <Overview isMediaSelected={isMediaSelected} data={data!} casts={casts} />
      </div>
      {/* Actions */}
      <section id="actions" className="flex gap-4">
        <Button
          variant={{
            name: "primary",
            isInverted: isMediaSelected,
          }}
          isFull
          onClick={() => {
            if (!isMediaSelected && mediaType === "movie") {
              router.push(`/premier/movie/${id}-${kebabCase(data.title!)}`);
            } else if (mediaType === "movie") {
              router.push(`/premier/movie/${id}-${kebabCase(data.title!)}/watch`);
            } else if (!isMediaSelected && mediaType === "tv") {
              router.push(`/premier/series/${id}-${kebabCase(data.name!)}`);
            } else if (mediaType === "tv") {
              router.push(
                `/premier/series/${id}-${toUrlSlugWithEncoding(data.name!)}/watch?season=1&episode=1`,
              );
            }
          }}
        >
          Watch Now
        </Button>
        {isMediaSelected && <FavoriteButton data={favorite!} mediaType={mediaType!} />}
      </section>
    </main>
  );
};

export default Showcase;

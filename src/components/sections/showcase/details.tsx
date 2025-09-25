import { MediaType } from "@/types/media";
import { runtimeDuration } from "@/utils/medias";
import { getLanguageName } from "language-name-to-language-name";
import { MovieDetails, TvShowDetails } from "tmdb-ts";
import { ShowcaseMediaProps } from "./logo";

interface DetailsProps {
  mediaType: MediaType;
  showcase: ShowcaseMediaProps;
  data: Partial<MovieDetails> & Partial<TvShowDetails>;
}

const Details: React.FC<DetailsProps> = ({ mediaType, data, showcase }) => {
  const language = getLanguageName(`${data.original_language}`);

  let certification: string | undefined;

  if (mediaType === "movie" && showcase && "release_dates" in showcase) {
    const us = showcase.release_dates.results.find((val) => val.iso_3166_1 === "US");
    certification = us?.release_dates?.[0]?.certification;
  } else if (mediaType === "tv" && showcase && "content_ratings" in showcase) {
    const us = showcase.content_ratings.results.find((val) => val.iso_3166_1 === "US");
    certification = us?.rating;
  }

  let measure: number;

  if (mediaType === "movie" && showcase && "runtime" in showcase) {
    const duration = showcase.runtime;
    measure = duration;
  } else if (mediaType === "tv" && showcase && "number_of_seasons" in showcase) {
    const seasons = showcase.number_of_seasons;
    measure = seasons;
  }

  return (
    <section id="details" className="tablet:text-sm flex items-center gap-1 text-xs">
      {mediaType === "movie" ? (
        <p className="font-medium">
          {data.release_date ? data.release_date.slice(0, 4) : "New"} • {runtimeDuration(measure!)}{" "}
          • {language} •
        </p>
      ) : (
        <p className="font-medium">
          {data.first_air_date ? data.first_air_date.slice(0, 4) : "New"} • {measure!} Seasons •{" "}
          {language} •
        </p>
      )}
      <div className="tablet:py-0 rounded bg-zinc-700 px-2 py-0.5 font-medium">
        {certification && certification.trim() !== "" ? (
          <span>{certification}</span>
        ) : (
          <span>PG</span>
        )}
      </div>
    </section>
  );
};

export default Details;

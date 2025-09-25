import { MediaType, TrendingVideo } from "@/types/media";
import { getImageUrl, Poster_Placeholder } from "@/utils/medias";
import { useRouter } from "@bprogress/next/app";
import { useMemo } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { kebabCase } from "string-ts";
import { Movie, TV } from "tmdb-ts";

interface CardProps {
  media: Movie | TV | TrendingVideo;
  className?: string;
  mediaType: MediaType;
  isMarked?: boolean;
}

const Card: React.FC<CardProps> = ({ media, className, isMarked, mediaType }) => {
  const router = useRouter();

  const parserData = useMemo(() => {
    let name: string;
    let media_type: MediaType;
    let to: string;
    if (mediaType === "all") {
      const parseData = media as TrendingVideo;
      name = parseData.title || parseData.name;
      media_type = parseData.media_type;
      to = parseData.media_type === "movie" ? "movie" : "series";
    } else if (mediaType === "movie") {
      const parseData = media as Movie;
      name = parseData.title;
      media_type = "movie";
      to = "movie";
    } else {
      const parseData = media as TV;
      name = parseData.name;
      media_type = "tv";
      to = "series";
    }

    return {
      name,
      media_type,
      to,
    };
  }, [media, mediaType]);

  return (
    <section
      className={`relative ${isMarked ? "cursor-auto" : "cursor-pointer"}`}
      onClick={(e) => {
        if (isMarked) {
          e.preventDefault();
        } else {
          router.push(`/premier/${parserData.to}/${media.id}-${kebabCase(parserData.name)}`);
        }
      }}
    >
      <div className={`relative aspect-[0.667] w-full overflow-hidden rounded-md ${className}`}>
        <LazyLoadImage
          src={getImageUrl(media.poster_path, "poster", true)}
          alt={`image-${parserData.name}`}
          className="aspect-[0.667] object-center"
          placeholderSrc={Poster_Placeholder}
          width={"100%"}
          height={"100%"}
        />
      </div>
    </section>
  );
};

export default Card;

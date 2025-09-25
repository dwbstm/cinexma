import { tmdb } from "@/services/api/tmdb";
import { Background_Placeholder, getImageUrl } from "@/utils/medias";
import { useRouter } from "@bprogress/next/app";
import { useQuery } from "@tanstack/react-query";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { kebabCase } from "string-ts";
import { TV } from "tmdb-ts";

interface CardProps {
  data: TV;
}

const Card: React.FC<CardProps> = ({ data }) => {
  const id = data.id;
  const { data: seasons } = useQuery({
    queryKey: ["seasons", id],
    queryFn: () => tmdb.tvShows.details(id),
  });
  const router = useRouter();
  return (
    <section
      className="cursor-pointer space-y-2"
      onClick={() => {
        router.push(`/premier/series/${data.id}-${kebabCase(data.name)}`);
      }}
    >
      <div className="group relative aspect-video overflow-hidden rounded-md">
        <LazyLoadImage
          src={getImageUrl(data.backdrop_path, "backdrop", true)}
          alt={`image-${data.name}`}
          className="object-cover object-center"
          placeholderSrc={Background_Placeholder}
          width={"100%"}
          height={"100%"}
        />
      </div>
      <div className="relative space-y-1">
        <p className="tablet:text-base tablet:w-64 line-clamp-1 w-52 text-xs font-semibold">
          {data.name}
        </p>
        <div className="tablet:text-xs text-[10px] font-semibold text-gray-500">
          {data.first_air_date ? data.first_air_date.slice(0, 4) : "New"} •{" "}
          {`${seasons?.number_of_seasons} Seasons`}
        </div>
      </div>
    </section>
  );
};

export default Card;

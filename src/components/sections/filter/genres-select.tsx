import { cn } from "@/utils/helpers";
import { Select, SelectItem, SelectProps } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import { Genre } from "tmdb-ts";
import { Genres } from "tmdb-ts/dist/endpoints";

interface GenresSelectProps extends Omit<SelectProps, "children" | "selectionMode"> {
  query: Promise<Genres> | Genres;
  onGenreChange?: (genres: Set<string> | null) => void;
}

const GenresSelect: React.FC<GenresSelectProps> = ({ query, onGenreChange, ...props }) => {
  const { data, isPending } = useQuery({
    queryFn: () => query,
    queryKey: ["get-genre-select"],
  });

  const genres = data?.genres as Genre[];
  return (
    <Select
      {...props}
      classNames={{
        label: "text-xs",
        value: "text-xs",
      }}
      size="sm"
      isLoading={isPending}
      selectionMode="multiple"
      label={props.label ?? "Genres"}
      placeholder={props.placeholder ?? "Select genres"}
      className={cn("tablet:max-w-xs max-w-[10rem]", props.className)}
      onChange={({ target }) =>
        onGenreChange?.(
          target.value === ""
            ? null
            : new Set(target.value.split(",").filter((genre) => genre !== "")),
        )
      }
    >
      {genres?.map((genre) => {
        return <SelectItem key={genre.id}>{genre.name}</SelectItem>;
      })}
    </Select>
  );
};

export default GenresSelect;

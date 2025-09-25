import { useMemo } from "react";
import { Season } from "tmdb-ts";
import dynamic from "next/dynamic";
const EpisodesSelection = dynamic(() => import("./episodes"));
import { Select, SelectItem } from "@heroui/react";
import { useRouter, useSearchParams } from "next/navigation";

interface SeasonsProps {
  id: number;
  seasons: Season[];
}

const Seasons: React.FC<SeasonsProps> = ({ id, seasons }) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const seasonParam = searchParams.get("season"); // ✅ query param: ?season=1

  const filtered_seasons = useMemo(() => seasons.filter((s) => s.season_number > 0), [seasons]);

  const seasonNumber = seasonParam ?? filtered_seasons[0]?.season_number.toString() ?? "1";

  const handleSeasonChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value;
    router.replace(`?season=${selected}`, { scroll: false });
  };

  return (
    <section id="seasons-episodes" className="flex flex-col gap-5 pt-5">
      <Select
        aria-label="Seasons"
        selectedKeys={[seasonNumber]}
        disallowEmptySelection={true}
        classNames={{ trigger: "border-2 border-blue-primary tablet:max-w-1/4 max-w-1/2" }}
        onChange={handleSeasonChange}
      >
        {filtered_seasons.map(({ season_number, name }) => (
          <SelectItem key={season_number.toString()}>{name}</SelectItem>
        ))}
      </Select>

      <EpisodesSelection id={id} seasonNumber={Number(seasonNumber)} />
    </section>
  );
};

export default Seasons;

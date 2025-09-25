import useDiscoverFilters from "@/hooks/useDiscoverFilters";
import React from "react";
import GenresSelect from "./genres-select";
import { tmdb } from "@/services/api/tmdb";
import { Button } from "@heroui/react";
import CountrySelect from "./country-select";
import YearSelect from "./year-select";
import { usePathname } from "next/navigation";

const Filter = () => {
  const pathName = usePathname();
  const { genres, country, year, resetFilters, setQueryType, setGenres, setCountry, setYear } =
    useDiscoverFilters();

  return (
    <section className="flex w-full flex-wrap justify-center gap-3">
      <section className="flex w-full flex-wrap items-center justify-center gap-3">
        <GenresSelect
          query={pathName === "/movies" ? tmdb.genres.movies() : tmdb.genres.tvShows()}
          selectedKeys={genres}
          onGenreChange={(genres) => {
            setGenres(genres);
            setQueryType("discover");
          }}
        />
        <CountrySelect
          selectedKeys={[country]}
          onChange={({ target }) => setCountry(target.value)}
        />
        <YearSelect selectedKeys={[year]} onChange={({ target }) => setYear(target.value)} />
        <Button className="tablet:hidden block" color="danger" size="sm" onPress={resetFilters}>
          Reset Filter
        </Button>
      </section>

      <Button className="tablet:block hidden" color="danger" size="sm" onPress={resetFilters}>
        Reset Filter
      </Button>
    </section>
  );
};

export default Filter;

import { queryClient as query } from "@/services/providers/client-provider";
import { MOVIES_VALID_QUERY_TYPES, SERIES_VALID_QUERY_TYPES } from "@/types/media";
import { parseAsSet } from "@/utils/parsers";
import { parseAsString, parseAsStringLiteral, useQueryState } from "nuqs";
import { useCallback, useEffect, useMemo } from "react";

const useDiscoverFilters = () => {
  const [genres, setGenres] = useQueryState("genres", parseAsSet.withDefault(new Set([])));
  const [country, setCountry] = useQueryState("country", parseAsString.withDefault(""));
  const [year, setYear] = useQueryState("year", parseAsString.withDefault(""));
  const [companies] = useQueryState(
    "without_companies",
    parseAsString.withDefault("198702,215214,201451"),
  );

  const [queryType, setQueryType] = useQueryState(
    "type",
    parseAsStringLiteral([...MOVIES_VALID_QUERY_TYPES, ...SERIES_VALID_QUERY_TYPES]).withDefault(
      "discover",
    ),
  );

  const genresString = useMemo(
    () =>
      Array.from(genres)
        .filter((genre) => genre !== "")
        .join(","),
    [genres],
  );

  const handleCountry = useMemo(() => [{ name: "country", key: country }], [country]);
  const handleYear = useMemo(() => [{ name: "year", key: year }], [year]);

  const resetFilters = useCallback(() => {
    setGenres(null);
    setCountry("");
    setYear("");
    setQueryType("discover");
  }, [setGenres, setQueryType, setCountry, setYear]);

  const clearQueries = useCallback(() => {
    const queryKeys = ["discover"];
    queryKeys.forEach((key) => {
      if (!query.isFetching({ queryKey: [key] })) {
        query.removeQueries({ queryKey: [key] });
      }
    });
  }, []);

  useEffect(() => {
    clearQueries();
  }, [queryType, genresString, handleCountry, handleYear, clearQueries]);

  return {
    genres,
    queryType,
    year,
    country,
    companies,
    genresString,
    setGenres,
    setCountry,
    setYear,
    setQueryType,
    resetFilters,
  };
};

export default useDiscoverFilters;

import { intervalToDuration } from "date-fns";
import { Movie, MovieDetails } from "tmdb-ts";

export const Poster_Placeholder = "/placeholders/poster-placeholder.png";
export const Background_Placeholder = "/placeholders/background-placeholder.png";
export const Person_Male = "/placeholders/male.png";
export const Person_Female = "/placeholders/female.png";

export function runtimeDuration(minutes?: number): string {
  if (!minutes) return "No data";
  const duration = intervalToDuration({ start: 0, end: minutes * 60 * 1000 });
  const hours = duration.hours ? `${duration.hours}h ` : "";
  const mins = duration.minutes ? `${duration.minutes}m` : "";
  return `${hours}${mins}`;
}

export function mutateTitle(movie?: MovieDetails | Movie, language: string = "id"): string {
  if (!movie) return "";
  return movie.original_language === language ? movie.original_title : movie.title;
}

export function formatString(slug: string): string {
  return slug
    .toLowerCase()
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export function getImageUrl(
  path?: string,
  type: "poster" | "backdrop" | "title" | "avatar" | "logo" = "poster",
  fullSize?: boolean,
): string {
  const size = fullSize ? "original" : "w500";
  const fallback =
    type === "poster" ? Poster_Placeholder : type === "backdrop" ? Background_Placeholder : "";
  return path ? `https://image.tmdb.org/t/p/${size}/${path}` : fallback;
}

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export const isEmpty = <T>(value: T): boolean => {
  if (value === null || value === undefined) {
    return true;
  }
  if (typeof value === "string") {
    return value.trim().length === 0;
  }
  if (Array.isArray(value)) {
    return value.length === 0;
  }
  if (value instanceof Map || value instanceof Set) {
    return value.size === 0;
  }
  if (value !== null && typeof value === "object") {
    return Object.keys(value).length === 0;
  }
  return false;
};

export function toUrlSlugWithEncoding(title: string) {
  // Step 1: Convert to lowercase
  const lower = title.toLowerCase(); // "wedding agreement: the series"

  // Step 2: Replace spaces with hyphens
  const hyphenated = lower.replace(/\s+/g, "-"); // "wedding-agreement:-the-series"

  // Step 3: Encode special characters (like the colon)
  const encoded = encodeURIComponent(hyphenated); // "wedding-agreement-%3A-the-series"

  return encoded;
}

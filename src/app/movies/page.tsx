import { Suspense } from "react";
import dynamic from "next/dynamic";
const MoviesList = dynamic(() => import("@/components/layouts/discover/movies-list"));

export default function ForYouPage() {
  return (
    <Suspense>
      <MoviesList />
    </Suspense>
  );
}

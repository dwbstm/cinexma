import { Suspense } from "react";
import dynamic from "next/dynamic";
const SeriesList = dynamic(() => import("@/components/layouts/discover/series-list"));

export default function ForYouPage() {
  return (
    <Suspense>
      <SeriesList />
    </Suspense>
  );
}

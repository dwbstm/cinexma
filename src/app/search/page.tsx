import { siteConfig } from "@/config/site";
import dynamic from "next/dynamic";
import { Metadata } from "next/types";
import { Suspense } from "react";

const SearchList = dynamic(() => import("@/components/layouts/search-list"));

export const metadata: Metadata = {
  title: `Search Movies and Series | ${siteConfig.name}`,
};

export default function SearchPage() {
  return (
    <Suspense>
      <SearchList />
    </Suspense>
  );
}

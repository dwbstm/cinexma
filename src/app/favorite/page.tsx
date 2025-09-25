import { siteConfig } from "@/config/site";
import { Metadata } from "next";
import FavoriteList from "@/components/layouts/favorite-list";

export const metadata: Metadata = {
  title: `Favorite | ${siteConfig.name}`,
};

export default function Favorite() {
  return <FavoriteList />;
}

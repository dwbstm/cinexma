"use client";

import Card from "@/components/sections/collection/portrait/card";
import { Movie, TV } from "tmdb-ts";
import ErrorState from "./error-state";

const MoreLike: React.FC<{
  data: Movie[] | TV[];
}> = ({ data }) => {
  return (
    <>
      <section
        id="more-like"
        className="desktop:grid-cols-7 laptop:grid-cols-6 tablet:grid-cols-5 tablet:mr-5 grid grid-cols-3 gap-3 pt-5"
      >
        {data.map((val, idx) => (
          <Card key={idx} media={val} mediaType="all" />
        ))}
      </section>
      {data.length === 0 && <ErrorState />}
    </>
  );
};

export default MoreLike;

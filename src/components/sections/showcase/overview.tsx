import { Cast, MovieDetails, TvShowDetails } from "tmdb-ts";

interface OverviewProps {
  isMediaSelected: boolean;
  data: Partial<MovieDetails> & Partial<TvShowDetails>;
  casts?: Cast[];
}

const Overview: React.FC<OverviewProps> = ({ isMediaSelected, data, casts }) => {
  return (
    <>
      {isMediaSelected === false ? (
        <section id="overview" className="max-h-12 overflow-y-auto">
          <p className="tablet:text-base text-xs">{data.overview!}</p>
        </section>
      ) : (
        <>
          <section
            id="cast"
            className="flex flex-wrap items-center [&>*:last-child]:after:content-none"
          >
            <p className="tablet:text-sm mr-2 text-xs font-medium">Casts :</p>
            {casts?.length === 0 ? (
              "-"
            ) : (
              <>
                {casts?.slice(0, 5).map((cast, idx) => (
                  <p key={idx} className="tablet:text-sm text-xs after:mr-1 after:content-[',']">
                    {cast.name}
                  </p>
                ))}
              </>
            )}
          </section>
          <section id="overview" className="max-h-12 overflow-y-auto">
            <p className="tablet:text-base text-xs">{data.overview!}</p>
          </section>
        </>
      )}
    </>
  );
};

export default Overview;

import { MediaType } from "@/types/media";
import { getImageUrl } from "@/utils/medias";
import Image from "next/image";
import { Image as ImageType, MovieDetails, ReleaseDate, TvShowDetails } from "tmdb-ts";

interface ShowcaseMovie {
  images: {
    logos: ImageType[];
  };
  release_dates: {
    results: { iso_3166_1: string; release_dates: ReleaseDate[] }[];
  };
  runtime: number;
}

interface ShowcaseTV {
  images: {
    logos: ImageType[];
  };
  content_ratings: {
    results: { iso_3166_1: string; rating: string }[];
  };
  number_of_seasons: number;
}

export type ShowcaseMediaProps = ShowcaseMovie | ShowcaseTV;

interface LogoProps {
  showcase: ShowcaseMediaProps;
  data: Partial<MovieDetails> & Partial<TvShowDetails>;
  mediaType?: MediaType;
}

const Logo: React.FC<LogoProps> = ({ showcase, data, mediaType }) => {
  const title = data.original_language === "id" ? data.original_title : data.title;
  const name = data.original_language === "id" ? data.original_name : data.name;

  const findLogoId = showcase?.images.logos.filter((val) => val.iso_639_1 === "id");
  const findLogoEn = showcase?.images.logos.filter((val) => val.iso_639_1 === "en");

  return (
    <section id="logo" className="tablet:aspect-square relative">
      {showcase?.images.logos.length === 0 ? (
        <div className="tablet:absolute relative bottom-0 w-full">
          <h1 className="font-playfair tablet:text-5xl text-4xl font-bold">
            {mediaType === "movie" ? title : name}
          </h1>
        </div>
      ) : (
        <>
          {data.original_language === "id" ? (
            <>
              {findLogoId?.find((val) => val.iso_639_1 === "id") ? (
                <>
                  {findLogoId?.slice(0, 1).map((logo, idx) => (
                    <div
                      key={idx}
                      style={{
                        aspectRatio: logo.aspect_ratio ? logo?.aspect_ratio : "1.84 / 1",
                      }}
                      className="tablet:absolute relative bottom-0 w-1/2"
                    >
                      <Image
                        src={getImageUrl(logo.file_path, "logo")}
                        alt="image-logo"
                        fill
                        sizes="500px"
                        priority
                        className="object-contain"
                      />
                    </div>
                  ))}
                </>
              ) : (
                <>
                  {showcase?.images.logos.slice(0, 1).map((logo, idx) => (
                    <div
                      key={idx}
                      style={{
                        aspectRatio: logo.aspect_ratio ? logo?.aspect_ratio : "1.84 / 1",
                      }}
                      className="tablet:absolute relative bottom-0 w-1/2"
                    >
                      <Image
                        src={getImageUrl(logo.file_path, "logo")}
                        alt="image-logo"
                        fill
                        sizes="500px"
                        priority
                        className="object-contain"
                      />
                    </div>
                  ))}
                </>
              )}
            </>
          ) : (
            <>
              {findLogoEn?.find((val) => val.iso_639_1 === "en") ? (
                <>
                  {findLogoEn?.slice(0, 1).map((logo, idx) => (
                    <div
                      key={idx}
                      style={{
                        aspectRatio: logo.aspect_ratio ? logo?.aspect_ratio : "1.84 / 1",
                      }}
                      className="tablet:absolute relative bottom-0 w-1/2"
                    >
                      <Image
                        src={getImageUrl(logo.file_path, "logo")}
                        alt="image-logo"
                        fill
                        sizes="500px"
                        priority
                        className="object-contain"
                      />
                    </div>
                  ))}
                </>
              ) : (
                <>
                  {showcase?.images.logos.slice(0, 1).map((logo, idx) => (
                    <div
                      key={idx}
                      style={{
                        aspectRatio: logo.aspect_ratio ? logo?.aspect_ratio : "1.84 / 1",
                      }}
                      className="tablet:absolute relative bottom-0 w-1/2"
                    >
                      <Image
                        src={getImageUrl(logo.file_path, "logo")}
                        alt="image-logo"
                        fill
                        sizes="500px"
                        priority
                        className="object-contain"
                      />
                    </div>
                  ))}
                </>
              )}
            </>
          )}
        </>
      )}
    </section>
  );
};

export default Logo;

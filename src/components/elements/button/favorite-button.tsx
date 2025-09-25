import { useLocalStorage } from "@mantine/hooks";
import { Heart, HeartSolid, TrashSolid } from "iconoir-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { Movie, TV } from "tmdb-ts";
import { MediaType } from "@/types/media";

interface FavoriteButtonProps {
  data: Partial<Movie> | Partial<TV>;
  mediaType: MediaType;
}

const extractImportantData = (data: Partial<Movie> & Partial<TV>, mediaType: MediaType) => ({
  backdrop_path: data.backdrop_path,
  id: data.id,
  poster_path: data.poster_path,
  release_date: mediaType === "movie" ? data.release_date : data.first_air_date,
  name: mediaType === "movie" ? data.title : data.name,
  media_type: mediaType === "movie" ? "movie" : "tv",
  saved_date: new Date().toISOString(),
});

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ data, mediaType }) => {
  const [favorite, setFavorite] = useLocalStorage<string[]>({
    key: "favorites",
    defaultValue: [],
  });

  const savedData = extractImportantData(data, mediaType);
  const savedString = JSON.stringify(savedData);
  const isSaved = favorite.some((saved) => JSON.parse(saved).id === data.id);
  const icon = isSaved ? (
    <HeartSolid width={24} height={24} color="#e7000b" />
  ) : (
    <Heart width={24} height={24} />
  );

  const handleFavorite = () => {
    if (isSaved) {
      setFavorite(favorite.filter((saved) => JSON.parse(saved).id !== data.id));
      toast(`${savedData.name} removed from your favorite !`, {
        icon: <TrashSolid width={18} height={18} color="#fb2c36" />,
      });
    } else {
      setFavorite([...favorite, savedString]);
      toast.success(`${savedData.name} saved to your favorite !`, {});
    }
  };

  return (
    <motion.button
      whileTap={{ scale: 0.85 }}
      onClick={handleFavorite}
      className="flex h-12 cursor-pointer items-center gap-1 rounded bg-zinc-800 px-4"
    >
      <div className="mx-auto flex w-min items-center gap-2">{icon}</div>
    </motion.button>
  );
};

export default FavoriteButton;

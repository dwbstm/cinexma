"use client";

import { useLocalStorage } from "@mantine/hooks";
import { Button, Checkbox, Select, SelectItem } from "@heroui/react";
import { useState, useMemo } from "react";
import { EditPencil, TrashSolid, Xmark } from "iconoir-react";
import toast from "react-hot-toast";
import Topbar from "../sections/topbar";
import Card from "../sections/collection/portrait/card";
import { TrendingVideo } from "@/types/media";

export default function FavoriteList() {
  const [value, setValue] = useLocalStorage<string[]>({
    key: "favorites",
    defaultValue: [],
  });

  const savedMedia: TrendingVideo[] = value.map((mediaString) => JSON.parse(mediaString));
  const [sortOption, setSortOption] = useState<string>("title");
  const [marked, setMarked] = useState(false);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const sortedMedia = useMemo(() => {
    return [...savedMedia].sort((a, b) => {
      if (sortOption === "vote_average" || sortOption === "release_date") {
        return b[sortOption] > a[sortOption] ? 1 : -1;
      } else {
        // @ts-expect-error it's working, why not?
        return a[sortOption]?.localeCompare(b[sortOption]);
      }
    });
  }, [savedMedia, sortOption]);

  const notEmpty = savedMedia.length > 0;

  const getTitle = savedMedia.filter((media) => selectedIds.includes(media.id));

  const title = getTitle.map((val) => val.title || val.name);

  const sortOptions = [
    { key: "title", label: "Title" },
    { key: "release_date", label: "Release Date" },
    { key: "vote_average", label: "Rating" },
    { key: "saved_date", label: "Saved Date" },
  ];

  const handleChecked = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((mid) => mid !== id) : [...prev, id],
    );
  };

  const handleDeleteSelected = () => {
    const updated = savedMedia.filter((media) => !selectedIds.includes(media.id));
    const updatedStorage = updated.map((media) => JSON.stringify(media));
    setSelectedIds([]);
    setMarked((prev) => !prev);
    setValue(updatedStorage);
    toast.success(
      `${selectedIds.length <= 1 ? `${title}` : `${selectedIds.length} items`} removed to your favorite!`,
      {},
    );
  };

  const handleMarked = () => {
    setMarked((prev) => !prev);
    setSelectedIds([]);
  };

  return (
    <section className="mx-3">
      <div className="tablet:hidden">
        <Topbar />
      </div>
      <section className="flex items-center justify-between pt-[90px]">
        {marked && (
          <Button isIconOnly variant="light" onPress={handleMarked}>
            <Xmark />
          </Button>
        )}
        <Select
          label="Sort"
          size="sm"
          placeholder="Select sort"
          className="max-w-[200px]"
          defaultSelectedKeys={["title"]}
          onChange={(e) => setSortOption(e.target.value)}
        >
          {sortOptions.map((sort) => (
            <SelectItem key={sort.key}>{sort.label}</SelectItem>
          ))}
        </Select>

        {!marked ? (
          <Button isIconOnly variant="light" onPress={handleMarked}>
            <EditPencil />
          </Button>
        ) : (
          <Button
            isDisabled={selectedIds.length < 1}
            variant="light"
            color="danger"
            isIconOnly
            onPress={handleDeleteSelected}
          >
            <TrashSolid />
          </Button>
        )}
      </section>

      {notEmpty ? (
        <section className="desktop:grid-cols-7 laptop:grid-cols-6 tablet:grid-cols-5 tablet:mr-5 grid grid-cols-3 gap-3 pt-5">
          {sortedMedia.map((media) => (
            <section key={media.id} className="relative">
              <Card
                mediaType="all"
                isMarked={marked}
                media={media}
                className={`${selectedIds.includes(media.id) ? "opacity-50" : ""}`}
              />
              {marked && (
                <div className="absolute top-2 right-2">
                  <Checkbox
                    key={media.id}
                    isSelected={selectedIds.includes(media.id)}
                    onChange={() => handleChecked(media.id)}
                  />
                </div>
              )}
            </section>
          ))}
        </section>
      ) : (
        <p className="flex h-[40vh] items-center justify-center">
          No movies saved in your favorite.
        </p>
      )}
    </section>
  );
}

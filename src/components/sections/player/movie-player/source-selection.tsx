import { PlayersProps } from "@/types";
import VaulDrawer from "@/components/elements/overlay/vaul-drawer";
import { HandlerType } from "@/types/component";
import SelectButton from "@/components/elements/input/select-button";
import { Rocket, StarSolid } from "iconoir-react";
import { Image } from "@heroui/react";

interface MoviePlayerSourceSelectionProps extends HandlerType {
  players: PlayersProps[];
  selectedSource: number;
  setSelectedSource: (source: number) => void;
}

const MoviePlayerSourceSelection: React.FC<MoviePlayerSourceSelectionProps> = ({
  opened,
  onClose,
  players,
  selectedSource,
  setSelectedSource,
}) => {
  return (
    <VaulDrawer
      open={opened}
      onClose={onClose}
      backdrop="blur"
      title="Select Source"
      direction="right"
      hiddenHandler
      withCloseButton
      classNames={{ content: "space-y-0" }}
    >
      <div className="flex flex-col gap-4 p-5">
        <div className="space-y-2 px-1 py-2">
          <div className="flex items-center gap-2">
            <StarSolid width={14} height={14} className="text-warning-500" />
            <span>Recommended</span>
          </div>
          <div className="flex items-center gap-2">
            <Rocket width={14} height={14} className="text-green-400" />
            <span>Fast hosting</span>
          </div>
          <div className="flex items-center gap-2">
            <Image src="/icons/ads.svg" alt="icon-ads" className="h-4 w-4 rounded-none" />
            <span>May contain popup ads</span>
          </div>
        </div>
        <SelectButton
          color="primary"
          groupType="list"
          value={selectedSource.toString()}
          onChange={(value) => {
            setSelectedSource(Number(value || 0));
            onClose();
          }}
          data={players.map(({ title, recommended, fast, ads }, index) => {
            return {
              label: title,
              value: index.toString(),
              endContent: (
                <div key={`info-${title}`} className="flex flex-wrap items-center gap-2">
                  {recommended && <StarSolid className="text-warning" />}
                  {fast && <Rocket className="text-danger" />}
                  {ads && (
                    <Image src="/icons/ads.svg" alt="icon-ads" className="h-4 w-4 rounded-none" />
                  )}
                </div>
              ),
            };
          })}
        />
      </div>
    </VaulDrawer>
  );
};

export default MoviePlayerSourceSelection;

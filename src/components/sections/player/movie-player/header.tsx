import ActionButton from "@/components/elements/button/action-button";
import { cn } from "@/utils/helpers";
import { NavArrowLeft, ServerSolid } from "iconoir-react";

interface HeaderProps {
  movieName: string;
  hidden?: boolean;
  onOpenSource: () => void;
}

const Header: React.FC<HeaderProps> = ({ movieName, hidden, onOpenSource }) => {
  return (
    <>
      <div
        aria-hidden={hidden ? true : undefined}
        className={cn(
          "absolute top-28 z-50 flex w-full items-start justify-between",
          "tablet:px-8 px-3 text-white transition-opacity",
          { "opacity-0": hidden },
        )}
      >
        <button
          onClick={() => history.back()}
          className="cursor-pointer rounded-full bg-zinc-800 p-1"
        >
          <NavArrowLeft width={24} height={24} />
        </button>
        <div className="flex items-center gap-4">
          <ActionButton label="Sources" tooltip="Sources" onClick={onOpenSource}>
            <ServerSolid className="tablet:size-8" />
          </ActionButton>
        </div>
      </div>
      <div
        aria-hidden={hidden ? true : undefined}
        className={cn(
          "absolute top-10 z-50 flex w-full",
          "tablet:px-5 px-3 text-white transition-opacity",
          { "opacity-0": hidden },
        )}
      >
        <div className="tablet:flex absolute left-1/2 -translate-x-1/2 flex-col justify-center text-center">
          <h2 className="text-shadow-background-dark tablet:text-xl font-semibold text-shadow-sm">
            {movieName}
          </h2>
        </div>
      </div>
    </>
  );
};

export default Header;

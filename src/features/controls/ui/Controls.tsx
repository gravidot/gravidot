import { BackgroundPattern } from "@/features/background/types";
import { GestureMode } from "@/views/board/types";
import BackgroundPatternToggle from "./BackgroundPatternToggle";
import { BoardController } from "./BoardController";
import { DeleteAllCacheButton } from "./DeleteAllCacheButton";
import EditingToggle from "./EditingToggle";
import { NameController } from "./NameController";
import { ShareBoardButton } from "./ShareBoardButton";
import { ZoomController } from "./ZoomController";

export function Controls({
  mode,
  onModeChange,
  pattern,
  onPatternChange,
}: {
  mode: GestureMode;
  onModeChange: (mode: GestureMode) => void;
  pattern: BackgroundPattern;
  onPatternChange: (pattern: BackgroundPattern) => void;
}) {
  return (
    <>
      <div className="fixed left-0 top-0 z-50 m-4 flex flex-row gap-1 rounded-2xl border border-neutral-200 bg-white px-2 py-2 text-xs drop-shadow-2xl dark:border-zinc-700 dark:bg-black">
        <BackgroundPatternToggle
          pattern={pattern}
          onPatternChange={onPatternChange}
        />
        <EditingToggle mode={mode} onModeChange={onModeChange} />
      </div>

      <div className="fixed left-14 top-0 z-50 m-4 flex flex-row gap-1 rounded-2xl border border-neutral-200 bg-white py-2 pl-3 pr-4 text-xs drop-shadow-2xl dark:border-zinc-700 dark:bg-black">
        <BoardController />
        <NameController />
      </div>

      <div className="fixed right-0 top-0 z-50 m-4 flex flex-row gap-2 rounded-2xl border border-neutral-200 bg-white px-2 py-2 text-xs drop-shadow-2xl dark:border-zinc-700 dark:bg-black">
        <ShareBoardButton />
        <ZoomController />
        <DeleteAllCacheButton />
      </div>
    </>
  );
}

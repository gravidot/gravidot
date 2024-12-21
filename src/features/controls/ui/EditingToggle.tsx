"use client";

import { GestureMode } from "@/views/board/types";
import { ControlButton } from "@/shared/ui/ControlButton";
import { EditedBoardIcon } from "@/shared/ui/EditedBoardIcon";
import { EditedNodeIcon } from "@/shared/ui/EditedNodeIcon";

export default function EditingToggle({
  mode,
  onModeChange,
}: {
  mode: GestureMode;
  onModeChange: (mode: GestureMode) => void;
}) {
  return (
    <div className="z-20 flex items-center text-black dark:text-white">
      <ControlButton onClick={() => onModeChange(mode)}>
        {mode === "shape" ? <EditedNodeIcon /> : <EditedBoardIcon />}
      </ControlButton>
    </div>
  );
}

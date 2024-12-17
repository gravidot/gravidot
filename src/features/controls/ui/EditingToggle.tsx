"use client";

import { GestureMode } from "@/pages/board/types";
import { ControlButton } from "@/shared/components/ControlButton";
import { EditedBoardIcon } from "@/shared/components/EditedBoardIcon";
import { EditedNodeIcon } from "@/shared/components/EditedNodeIcon";

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

"use client";

import { useBoardStore } from "@/entities/board/store";
import { fetchNodesByBoardId } from "@/entities/node/api";
import { Controls } from "@/features/controls";
import { BackgroundVariant } from "@xyflow/react";
import { useEffect, useRef, useState } from "react";
import { useShapeGestures } from "../hooks/useShapeGestures";
import { GestureMode } from "../types";
import { TouchPoint } from "./TouchPoint";

export function BoardPage() {
  const ref = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const boardId = useBoardStore.getState().id;

  const [mode, setMode] = useState<GestureMode>("shape");
  const [backgroundPattern, setBackgroundPattern] = useState<BackgroundVariant>(
    BackgroundVariant.Dots
  );

  const onModeChange = () => {
    setMode((prev) => (prev === "board" ? "shape" : "board"));
  };

  const onPatternChange = () => {
    setBackgroundPattern((prev) =>
      prev === BackgroundVariant.Dots
        ? BackgroundVariant.Lines
        : BackgroundVariant.Dots
    );
  };

  useEffect(() => {
    if (boardId) {
      fetchNodesByBoardId(boardId);
    }
  }, [boardId]);

  const { shapes, selectedShapeIndex, updateShapeContent, touchPoints } =
    useShapeGestures({
      isActive: mode === "shape",
      canvasRef,
      textareaRef,
    });

  return (
    <>
      <Controls
        mode={mode}
        onModeChange={onModeChange}
        pattern={backgroundPattern}
        onPatternChange={onPatternChange}
      />
      <div ref={ref} className={`h-dvh w-dvw touch-none`}>
        <TouchPoint touchPoints={touchPoints} />
      </div>
    </>
  );
}

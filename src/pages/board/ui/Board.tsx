"use client";

import { useBoardStore } from "@/entities/board/store";
import { fetchNodesByBoardId } from "@/entities/node/api";
import { Background } from "@/features/background";
import { Canvas } from "@/features/canvas";
import { Controls } from "@/features/controls";
import { useEffect, useRef, useState } from "react";
import { useBoardGestures } from "../hooks/useBoardGestures";
import { useShapeGestures } from "../hooks/useShapeGestures";
import { GestureMode } from "../types";
import { TouchPoint } from "./TouchPoint";

export function BoardPage() {
  const ref = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const boardId = useBoardStore.getState().id;

  const [mode, setMode] = useState<GestureMode>("shape");

  const onModeChange = () => {
    setMode((prev) => (prev === "board" ? "shape" : "board"));
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

  const { cursor } = useBoardGestures({
    isActive: mode === "board",
    ref,
  });

  return (
    <>
      <Controls mode={mode} onModeChange={onModeChange} />
      <div ref={ref} className={`h-dvh w-dvw touch-none ${cursor}`}>
        <TouchPoint touchPoints={touchPoints} />
        <Canvas
          canvasRef={canvasRef}
          textareaRef={textareaRef}
          shapes={shapes}
          selectedShapeIndex={selectedShapeIndex}
          updateShapeContent={updateShapeContent}
        />
        <Background />
      </div>
    </>
  );
}

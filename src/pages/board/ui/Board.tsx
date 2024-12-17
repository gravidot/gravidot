"use client";

import { useBoardStore } from "@/entities/board/store";
import { fetchNodesByBoardId } from "@/entities/node/api";
import { Background } from "@/features/background";
import { Canvas } from "@/features/canvas";
import { Controls } from "@/features/controls";
import { useBoardGestures } from "@/pages/board/hooks/useBoardGestures";
import { useEffect, useRef } from "react";

export function BoardPage() {
  const ref = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const boardId = useBoardStore.getState().id;

  const { cursor } = useBoardGestures({ ref });

  useEffect(() => {
    if (boardId) {
      fetchNodesByBoardId(boardId);
    }
  }, [boardId]);

  return (
    <>
      <Controls />
      <div ref={ref} className={`h-dvh w-dvw touch-none ${cursor}`}>
        <Canvas canvasRef={canvasRef} textareaRef={textareaRef} />
        <Background />
      </div>
    </>
  );
}

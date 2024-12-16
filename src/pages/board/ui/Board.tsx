"use client";

import { Background } from "@/features/background";
import { Canvas } from "@/features/canvas";
import { Controls } from "@/features/controls";
import { useBoardGestures } from "@/pages/board/hooks/useBoardGestures";
import { useRef } from "react";

export function BoardPage() {
  const ref = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const { cursor } = useBoardGestures({ ref });

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

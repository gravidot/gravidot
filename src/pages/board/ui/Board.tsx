"use client";

import { Background } from "@/features/background";
import { Canvas } from "@/features/canvas/ui";
import { Controls } from "@/features/controls";
import { useBoardGestures } from "@/pages/board/hooks/useBoardGestures";
import { useRef } from "react";

export function BoardPage() {
  const ref = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { cursor } = useBoardGestures({ ref });

  return (
    <>
      <Controls />
      <div ref={ref} className={`h-dvh w-dvw touch-none ${cursor}`}>
        <Canvas canvasRef={canvasRef} shapes={[]} />
        <Background />
      </div>
    </>
  );
}

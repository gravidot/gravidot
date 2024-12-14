"use client";

import { Background } from "@/features/background";
import { Canvas } from "@/features/canvas/ui";
import { Controls } from "@/features/controls";
import { useMultiGestures } from "@/pages/board/hooks/useMultiGestures";
import { useRef } from "react";

export function BoardPage() {
  const ref = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { cursor, shapes } = useMultiGestures({ ref, canvasRef });

  return (
    <>
      <Controls />
      <div ref={ref} className={`h-dvh w-dvw touch-none ${cursor}`}>
        <Canvas canvasRef={canvasRef} shapes={shapes} />
        <Background />
      </div>
    </>
  );
}

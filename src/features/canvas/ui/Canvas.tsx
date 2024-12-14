"use client";

import { useBoardStore } from "@/entities/board/store";
import { Shape } from "@/entities/shape/model";
import { RefObject, useEffect, useState } from "react";

export function Canvas({
  canvasRef,
  shapes,
}: {
  canvasRef: RefObject<HTMLCanvasElement>;
  shapes: Shape[];
}) {
  const transform = useBoardStore((state) => state.transform);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;

      const context = canvas.getContext("2d");
      if (context) {
        context.scale(dpr, dpr);
        setCtx(context);
      }
    }
  }, [canvasRef]);

  useEffect(() => {
    if (!ctx) return;

    ctx.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);

    shapes.forEach((shape) => {
      shape.draw({
        canvasRef: canvasRef,
        transform: transform,
      });
    });
  }, [ctx, transform, shapes, canvasRef]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute left-0 top-0 z-10 h-dvh w-dvw bg-transparent bg-none"
      style={{
        transformOrigin: "top left",
      }}
    />
  );
}

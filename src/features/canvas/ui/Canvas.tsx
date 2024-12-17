"use client";

import { Shape } from "@/entities/node/model/shape";
import { RefObject } from "react";

export function Canvas({
  canvasRef,
  textareaRef,
  shapes,
  selectedShapeIndex,
  updateShapeContent,
}: {
  canvasRef: RefObject<HTMLCanvasElement>;
  textareaRef: RefObject<HTMLTextAreaElement>;
  shapes: Shape[];
  selectedShapeIndex: number | null;
  updateShapeContent: (content: string) => void;
}) {
  return (
    <>
      <canvas
        ref={canvasRef}
        className="absolute left-0 top-0 z-10 h-dvh w-dvw touch-none bg-transparent bg-none"
      />
      {selectedShapeIndex !== null && (
        <textarea
          ref={textareaRef}
          onChange={(e) => updateShapeContent(e.target.value)}
          className="absolute z-10 h-fit cursor-text overflow-hidden bg-transparent text-center text-sm text-transparent focus:outline-none"
          style={{
            top: `${shapes[selectedShapeIndex]?.position.y - shapes[selectedShapeIndex]?.size.h / 8}px`,
            left: `${shapes[selectedShapeIndex]?.position.x - shapes[selectedShapeIndex]?.size.w / 2}px`,
            maxWidth: `${shapes[selectedShapeIndex]?.size.w}px`,
            maxHeight: `${shapes[selectedShapeIndex]?.size.h}px`,
          }}
        />
      )}
    </>
  );
}

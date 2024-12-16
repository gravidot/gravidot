"use client";

import { useBoardStore } from "@/entities/board/store";
import { useShapeGestures } from "@/pages/board/hooks/useShapeGestures";
import { RefObject, useCallback, useEffect, useState } from "react";

export function Canvas({
  canvasRef,
  textareaRef,
}: {
  canvasRef: RefObject<HTMLCanvasElement>;
  textareaRef: RefObject<HTMLTextAreaElement>;
}) {
  const transform = useBoardStore((state) => state.transform);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);

  const {
    shapes,
    setShapes,
    selectedShapeIndex,
    currentText,
    setCurrentText,
    handleDeleteKey,
  } = useShapeGestures({
    canvasRef,
    textareaRef,
  });

  const updateShapeContent = (text: string) => {
    setCurrentText(text);

    if (selectedShapeIndex !== null) {
      setShapes((prevShapes) =>
        prevShapes.map((shape, index) => {
          if (ctx && index === selectedShapeIndex) {
            shape.setContent(ctx, text);
          }
          return shape;
        })
      );
    }
  };

  const drawShapes = useCallback(
    (ctx: CanvasRenderingContext2D) => {
      ctx.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);

      shapes.forEach((shape, index) => {
        shape.draw({
          canvasRef: canvasRef,
          transform: transform,
          isSelected: index === selectedShapeIndex,
        });
      });
    },
    [shapes, selectedShapeIndex, canvasRef, transform]
  );

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
    if (ctx) {
      drawShapes(ctx);
    }

    document.addEventListener("keyup", handleDeleteKey);

    return () => {
      document.removeEventListener("keyup", handleDeleteKey);
    };
  }, [ctx, drawShapes, handleDeleteKey]);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="absolute left-0 top-0 z-10 h-dvh w-dvw touch-none bg-transparent bg-none"
      />
      {selectedShapeIndex !== null && (
        <textarea
          ref={textareaRef}
          value={currentText}
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

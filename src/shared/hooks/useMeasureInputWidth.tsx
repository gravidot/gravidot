import { RefObject, useEffect, useRef } from "react";

const CURSOR_WIDTH = 2;
const MAX_WIDTH = 256;

export function useMeasureInputWidth(
  inputRef: RefObject<HTMLInputElement>,
  value: string
) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    if (!canvasRef.current) {
      canvasRef.current = document.createElement("canvas");
    }

    if (!contextRef.current) {
      contextRef.current = canvasRef.current.getContext("2d");
    }

    if (contextRef.current && inputRef.current) {
      const font = getComputedStyle(inputRef.current).font;
      contextRef.current.font = font;

      const textWidth = contextRef.current.measureText(
        value || "Untitled"
      ).width;
      inputRef.current.style.width = `${Math.min(textWidth + CURSOR_WIDTH, MAX_WIDTH)}px`;
    }
  }, [value, inputRef]);
}

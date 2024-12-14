"use client";

import { useBoardStore } from "@/entities/board/store";
import { memo, useCallback, useMemo } from "react";
import { BackgroundPattern, BackgroundProps } from "../types";
import { DotPattern, LinePattern } from "./Patterns";

export const Background = memo(function Background({
  pattern = BackgroundPattern.Dots,
  lineWidth = 1,
  gap = 24,
}: BackgroundProps) {
  const transform = useBoardStore((state) => state.transform);

  const scaledGap = useMemo(
    () => gap * transform.zoomScale,
    [gap, transform.zoomScale]
  );
  const scaledOffset = useMemo(
    () => (transform.zoomScale ?? 1) + scaledGap / 2,
    [scaledGap, transform.zoomScale]
  );

  const drawPattern = useCallback(
    () => getPatternComponent(pattern, scaledGap, lineWidth, gap),
    [pattern, scaledGap, lineWidth, gap]
  );

  return (
    <svg
      className="h-dvh w-dvw touch-none"
      xmlns="http://www.w3.org/2000/svg"
      data-testid="background-svg"
    >
      <defs>
        <pattern
          id="grid-pattern"
          x={transform.x % scaledGap}
          y={transform.y % scaledGap}
          width={scaledGap}
          height={scaledGap}
          patternUnits="userSpaceOnUse"
          patternTransform={`translate(-${scaledOffset}, -${scaledOffset})`}
        >
          {drawPattern()}
        </pattern>
      </defs>
      <rect
        className="h-dvh w-dvw"
        fill="url(#grid-pattern)"
        data-testid="rect-element"
      />
    </svg>
  );
});

function getPatternComponent(
  pattern: BackgroundPattern,
  radius: number,
  lineWidth: number,
  gap: number
): JSX.Element | null {
  switch (pattern) {
    case BackgroundPattern.Dots:
      return <DotPattern radius={radius / 12} />;
    case BackgroundPattern.Lines:
      return <LinePattern distance={gap} lineWidth={lineWidth} />;
    case BackgroundPattern.None:
      return null;
    default:
      return <DotPattern radius={radius / 12} />;
  }
}

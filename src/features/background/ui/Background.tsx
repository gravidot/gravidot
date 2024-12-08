"use client";

import { memo, useCallback, useRef } from "react";
import { BackgroundPattern, BackgroundProps } from "../types";
import { DotPattern, LinePattern } from "./Patterns";

export const Background = memo(function Background({
  pattern = BackgroundPattern.Dots,
  radius = 2,
  lineWidth = 1,
  gap = 24,
}: BackgroundProps) {
  const ref = useRef<SVGSVGElement>(null);

  const drawPattern = useCallback(
    () => getPatternComponent(pattern, radius, lineWidth, gap),
    [pattern, radius, lineWidth, gap]
  );

  return (
    <svg ref={ref} className="h-dvh w-dvw" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern
          id="grid-pattern"
          x="0"
          y="0"
          width={gap}
          height={gap}
          patternUnits="userSpaceOnUse"
        >
          {drawPattern()}
        </pattern>
      </defs>
      <rect className="h-dvh w-dvw" fill="url(#grid-pattern)" />
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
      return <DotPattern radius={radius} />;
    case BackgroundPattern.Lines:
      return <LinePattern distance={gap} lineWidth={lineWidth} />;
    default:
      return null;
  }
}

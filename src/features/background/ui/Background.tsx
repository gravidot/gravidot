"use client";

import { useGesture } from "@use-gesture/react";
import { memo, useCallback, useRef, useState } from "react";
import { useBackgroundStore } from "../hooks";
import { BackgroundPattern, BackgroundProps } from "../types";
import { DotPattern, LinePattern } from "./Patterns";

const MIN_ZOOM = 0.1;
const MAX_ZOOM = 2.5;

export const Background = memo(function Background({
  pattern = BackgroundPattern.Dots,
  lineWidth = 1,
  gap = 24,
}: BackgroundProps) {
  const transform = useBackgroundStore((state) => state.transform);
  const setTransform = useBackgroundStore((state) => state.setTransform);
  const [isWheelClick, setIsWheelClick] = useState<boolean>(false);
  const [cursor, setCursor] = useState<string>("cursor-auto");

  const ref = useRef<SVGSVGElement>(null);

  const scaledGap: number = gap * transform.zoomScale || 1;
  const scaledOffset: number = transform.zoomScale || 1 + scaledGap / 2;

  const drawPattern = useCallback(
    () => getPatternComponent(pattern, scaledGap, lineWidth, gap),
    [pattern, scaledGap, lineWidth, gap]
  );

  useGesture(
    {
      onMouseDown: ({ event }) => {
        if (event.button === 1 && event.buttons === 4) {
          setIsWheelClick(true);

          setTransform((prev) => ({
            ...prev,
            x: event.clientX,
            y: event.clientY,
          }));
        }
      },

      onMouseMove: ({ event }) => {
        setCursor("cursor-auto");

        if (isWheelClick) {
          setCursor("cursor-grabbing");
          setTransform((prev) => ({
            ...prev,
            x: event.clientX,
            y: event.clientY,
          }));
        }
      },

      onMouseUp: () => {
        setIsWheelClick(false);
      },

      onMouseLeave: () => {
        setIsWheelClick(false);
      },

      onPinch: ({ offset: [scale], origin: [originX, originY] }) => {
        setTransform((prevTransform) => {
          return {
            ...prevTransform,
            x: originX,
            y: originY,
            zoomScale: scale,
          };
        });
      },

      onWheel: ({ movement: [mx, my] }) => {
        setTransform((prevTransform) => ({
          ...prevTransform,
          x: -mx,
          y: -my,
        }));
      },
    },

    {
      target: ref,
      eventOptions: { passive: false },
      preventDefault: true,
      pinch: { scaleBounds: { min: MIN_ZOOM, max: MAX_ZOOM * 2 } },
      drag: {
        threshold: 10,
        filterTaps: true,
        tapsThreshold: 3,
      },
    }
  );

  return (
    <svg
      ref={ref}
      className={`h-dvh w-dvw cursor-auto touch-none ${cursor}`}
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
    default:
      return null;
  }
}
export { BackgroundPattern };

import { useBoardStore } from "@/entities/board/store";
import { useGesture } from "@use-gesture/react";
import { RefObject, useState } from "react";
import { useShallow } from "zustand/shallow";

const MIN_ZOOM = 0.5;
const MAX_ZOOM = 2.5;
const SCROLL_SPEED = 0.02;

export const useBoardGestures = ({
  isActive,
  ref,
}: {
  isActive: boolean;
  ref: RefObject<HTMLDivElement>;
}) => {
  const setTransform = useBoardStore(useShallow((state) => state.setTransform));
  const [isWheelClick, setIsWheelClick] = useState<boolean>(false);
  const [cursor, setCursor] = useState<string>("cursor-auto");

  useGesture(
    {
      onMouseDown: ({ event }) => {
        if (!isActive) return;
        if (event.button === 1 && event.buttons === 4) {
          setCursor("cursor-grab");
          setIsWheelClick(true);
        }
      },

      onMouseMove: ({ event }) => {
        if (!isActive || !isWheelClick) return;
        setCursor("cursor-grabbing");
        setTransform((prev) => ({
          ...prev,
          x: event.clientX,
          y: event.clientY,
        }));
      },

      onMouseUp: () => {
        if (!isActive) return;
        setCursor("cursor-auto");
        setIsWheelClick(false);
      },

      onPinch: ({ offset: [scale], origin: [originX, originY] }) => {
        if (!isActive) return;
        setTransform((prevTransform) => {
          if (prevTransform.zoomScale > scale) {
            setCursor("cursor-zoom-out");
          } else if (prevTransform.zoomScale < scale) {
            setCursor("cursor-zoom-in");
          }

          return {
            ...prevTransform,
            x: originX,
            y: originY,
            zoomScale: scale,
          };
        });
      },

      onWheel: ({ movement: [mx, my] }) => {
        if (!isActive) return;
        setCursor("cursor-grabbing");
        setTransform((prev) => ({
          ...prev,
          x: prev.x - mx * SCROLL_SPEED,
          y: prev.y - my * SCROLL_SPEED,
        }));
      },

      onWheelEnd: () => {
        if (!isActive) return;
        setCursor("cursor-auto");
      },
    },
    {
      target: ref,
      eventOptions: { passive: false, preventDefault: true },
      pinch: { scaleBounds: { min: MIN_ZOOM, max: MAX_ZOOM } },
      drag: { threshold: 10 },
    }
  );

  return { cursor };
};

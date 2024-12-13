import { Shape } from "@/entities/shape/model";
import { useBackgroundStore } from "@/features/background/hooks";
import { useGesture } from "@use-gesture/react";
import { RefObject, useRef, useState } from "react";

const MIN_ZOOM = 0.1;
const MAX_ZOOM = 2.5;
const DOUBLE_CLICK_TIME_THRESHOLD = 250;

export const useMultiGestures = ({
  ref,
  canvasRef,
}: {
  ref: RefObject<HTMLDivElement>;
  canvasRef: RefObject<HTMLCanvasElement>;
}) => {
  const setTransform = useBackgroundStore((state) => state.setTransform);
  const [isWheelClick, setIsWheelClick] = useState<boolean>(false);
  const [shapes, setShapes] = useState<Shape[]>([]);
  const lastClickTime = useRef<number>(0);
  const [cursor, setCursor] = useState<string>("cursor-auto");

  useGesture(
    {
      onMouseDown: ({ event }) => {
        if (event.button === 1 && event.buttons === 4) {
          setCursor("cursor-grab");
          setIsWheelClick(true);

          setTransform((prev) => ({
            ...prev,
            x: event.clientX,
            y: event.clientY,
          }));

          return;
        }

        const now = performance.now();
        const timeSinceLastClick = now - lastClickTime.current;

        if (timeSinceLastClick < DOUBLE_CLICK_TIME_THRESHOLD) {
          setShapes((prevShapes) => {
            const {
              x: offsetX,
              y: offsetY,
              zoomScale,
            } = useBackgroundStore.getState().transform;

            const startX =
              (event.pageX - (canvasRef.current?.offsetLeft || 0)) / zoomScale +
              offsetX;
            const startY =
              (event.pageY - (canvasRef.current?.offsetTop || 0)) / zoomScale +
              offsetY;

            const shape = new Shape({
              position: { x: startX, y: startY },
            });

            return [...prevShapes, shape];
          });
        }

        lastClickTime.current = now;
      },

      onMouseMove: ({ event }) => {
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
        setCursor("cursor-auto");
        setIsWheelClick(false);
      },

      onMouseLeave: () => {
        setIsWheelClick(false);
      },

      onPinch: ({ offset: [scale], origin: [originX, originY] }) => {
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

      onWheelStart: () => {
        setCursor("cursor-grab");
      },

      onWheel: ({ movement: [mx, my] }) => {
        setCursor("cursor-grabbing");
        setTransform((prevTransform) => ({
          ...prevTransform,
          x: -mx,
          y: -my,
        }));
      },

      onWheelEnd: () => {
        setCursor("cursor-auto");
      },
    },

    {
      target: ref,
      eventOptions: { passive: false, preventDefault: true },
      pinch: { scaleBounds: { min: MIN_ZOOM, max: MAX_ZOOM * 2 } },
      drag: {
        threshold: 10,
        filterTaps: true,
        tapsThreshold: 3,
      },
    }
  );

  return { cursor, shapes };
};

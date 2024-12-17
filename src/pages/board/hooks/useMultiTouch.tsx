import { Shape } from "@/entities/node/model/shape";
import { useCallback, useRef, useState } from "react";

export function useMultiTouch(
  isActive: boolean,
  selectedShapeIndex: number | null,
  updateShape: (index: number, changes: Partial<Shape>) => void
) {
  const initialDistance = useRef<number | null>(null);
  const initialAngle = useRef<number | null>(null);
  const [touchPoints, setTouchPoints] = useState<{ x: number; y: number }[]>(
    []
  );

  const handleTouchMove = useCallback(
    (event: TouchEvent) => {
      if (!isActive || selectedShapeIndex === null) return;

      const touchCount = event.touches.length;

      if (touchCount === 2) {
        const [touch1, touch2] = event.touches;
        setTouchPoints([
          { x: touch1.clientX, y: touch1.clientY },
          { x: touch2.clientX, y: touch2.clientY },
        ]);

        const currentDistance = Math.hypot(
          touch2.clientX - touch1.clientX,
          touch2.clientY - touch1.clientY
        );
        const currentAngle = Math.atan2(
          touch2.clientY - touch1.clientY,
          touch2.clientX - touch1.clientX
        );

        if (initialDistance.current === null || initialAngle.current === null) {
          initialDistance.current = currentDistance;
          initialAngle.current = currentAngle;
          return;
        }

        const scale = Math.max(
          0.5,
          Math.min(3, currentDistance / initialDistance.current)
        );
        const rotation =
          ((currentAngle - initialAngle.current) * 180) / Math.PI;

        updateShape(selectedShapeIndex, { scale, rotation });
      }
    },
    [isActive, selectedShapeIndex, updateShape]
  );

  const handleTouchEnd = useCallback(() => {
    initialDistance.current = null;
    initialAngle.current = null;
    setTouchPoints([]);
  }, []);

  return { handleTouchMove, handleTouchEnd, touchPoints };
}

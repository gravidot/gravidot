import { Vertex } from "@/entities/node/model";
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
      } else if (touchCount === 3) {
        const [touch1, touch2, touch3] = event.touches;

        setTouchPoints([
          { x: touch1.clientX, y: touch1.clientY },
          { x: touch2.clientX, y: touch2.clientY },
          { x: touch3.clientX, y: touch3.clientY },
        ]);

        const angleRad = Math.atan2(
          touch3.clientY - touch1.clientY,
          touch3.clientX - touch1.clientX
        );

        let angleDeg = Math.abs(((angleRad * 180) / Math.PI) % 360);

        if (angleDeg > 30) {
          angleDeg = 30;
        }

        let selectedVertex;
        if (angleDeg <= 6) {
          selectedVertex = Vertex.circle;
        } else if (angleDeg <= 12) {
          selectedVertex = Vertex.square;
        } else if (angleDeg <= 18) {
          selectedVertex = Vertex.pentagon;
        } else if (angleDeg <= 24) {
          selectedVertex = Vertex.hexagon;
        } else {
          selectedVertex = Vertex.star;
        }

        updateShape(selectedShapeIndex, { vertex: selectedVertex });
      } else if (touchCount === 4) {
        const [touch1, touch2, touch3, touch4] = event.touches;

        setTouchPoints([
          { x: touch1.clientX, y: touch1.clientY },
          { x: touch2.clientX, y: touch2.clientY },
          { x: touch3.clientX, y: touch3.clientY },
          { x: touch4.clientX, y: touch4.clientY },
        ]);

        const points = [
          { x: touch1.clientX, y: touch1.clientY },
          { x: touch2.clientX, y: touch2.clientY },
          { x: touch3.clientX, y: touch3.clientY },
          { x: touch4.clientX, y: touch4.clientY },
        ];

        const minX = Math.min(...points.map((point) => point.x));
        const maxX = Math.max(...points.map((point) => point.x));
        const minY = Math.min(...points.map((point) => point.y));
        const maxY = Math.max(...points.map((point) => point.y));

        const size = {
          w: Math.max(100, (maxX - minX) / 2),
          h: Math.max(100, maxY - minY),
        };

        updateShape(selectedShapeIndex, { size });
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

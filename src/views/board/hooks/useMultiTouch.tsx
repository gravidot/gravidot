import { ColorType, Vertex } from "@/entities/node/model";
import { Shape } from "@/entities/node/model/shape";
import { calculateAngle } from "@/shared/utils/calculateAngle";
import { calculateDistance } from "@/shared/utils/calculateDistance";
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
  const activeTouchType = useRef<string | null>(null);
  const endTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleTouchMove = useCallback(
    (event: TouchEvent) => {
      if (!isActive || selectedShapeIndex === null) return;

      const touchCount = event.touches.length;
      activeTouchType.current = `${touchCount}touch`;

      if (touchCount === 2) {
        const [touch1, touch2] = event.touches;

        setTouchPoints([
          { x: touch1.clientX, y: touch1.clientY },
          { x: touch2.clientX, y: touch2.clientY },
        ]);

        const currentDistance = calculateDistance(touch1, touch2);
        const currentAngle = calculateAngle(touch1, touch2);

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
      } else if (touchCount === 5) {
        const [touch1, touch2, touch3, touch4, touch5] = event.touches;

        setTouchPoints([
          { x: touch1.clientX, y: touch1.clientY },
          { x: touch2.clientX, y: touch2.clientY },
          { x: touch3.clientX, y: touch3.clientY },
          { x: touch4.clientX, y: touch4.clientY },
          { x: touch5.clientX, y: touch5.clientY },
        ]);

        const d = calculateDistance(touch1, touch5);

        let selectedColor;

        if (d < 300) {
          selectedColor = ColorType.blue;
        } else if (d < 340) {
          selectedColor = ColorType.green;
        } else if (d < 380) {
          selectedColor = ColorType.pink;
        } else if (d < 420) {
          selectedColor = ColorType.purple;
        } else if (d < 460) {
          selectedColor = ColorType.yellow;
        } else {
          selectedColor = ColorType.transparent;
        }

        updateShape(selectedShapeIndex, { color: selectedColor });
      }
    },
    [isActive, selectedShapeIndex, updateShape]
  );

  const handleTouchEnd = useCallback(() => {
    if (endTimer.current) {
      clearTimeout(endTimer.current);
    }

    endTimer.current = setTimeout(() => {
      initialDistance.current = null;
      initialAngle.current = null;
      setTouchPoints([]);
      activeTouchType.current = null;
    }, 300);
  }, []);

  return { handleTouchMove, handleTouchEnd, touchPoints };
}

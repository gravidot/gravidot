import { Shape } from "@/entities/shape/model";
import { useGesture } from "@use-gesture/react";
import { RefObject, useRef, useState } from "react";

const DOUBLE_CLICK_TIME_THRESHOLD = 250;
const LONG_PRESS_THRESHOLD = 500;
const DRAG_REPEAT_THRESHOLD = 8;

export const useShapeGestures = ({
  canvasRef,
  textareaRef,
}: {
  canvasRef: RefObject<HTMLCanvasElement>;
  textareaRef: RefObject<HTMLTextAreaElement>;
}) => {
  const [shapes, setShapes] = useState<Shape[]>([]);
  const [selectedShapeIndex, setSelectedShapeIndex] = useState<number | null>(
    null
  );
  const [currentText, setCurrentText] = useState<string>("");
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
  const [initialPosition, setInitialPosition] = useState<{
    x: number;
    y: number;
  }>({ x: 0, y: 0 });

  const clickCount = useRef<number>(0);
  const lastClickTime = useRef<number>(0);
  const longPressTimer = useRef<NodeJS.Timeout | null>(null);
  const dragCount = useRef<number>(0);
  const lastDragDirection = useRef<"left" | "right" | null>(null);

  const isTouchDevice = () =>
    "ontouchstart" in window || navigator.maxTouchPoints > 0;

  const findClickedShapeIndex = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const clickX = clientX - canvas.offsetLeft;
    const clickY = clientY - canvas.offsetTop;

    const clickedShapeIndex = shapes.findIndex((shape) => {
      return (
        clickX >= shape.position.x - shape.size.w &&
        clickX <= shape.position.x + shape.size.w &&
        clickY >= shape.position.y - shape.size.h &&
        clickY <= shape.position.y + shape.size.h
      );
    });

    return clickedShapeIndex;
  };

  const handleDelete = (selectedShapeIndex: number) => {
    setShapes((prev) => [
      ...prev.filter((e) => e !== shapes[selectedShapeIndex]),
    ]);
  };

  const handleDeleteKey = (event: KeyboardEvent) => {
    const isTextareaFocused = textareaRef.current === document.activeElement;

    if (
      selectedShapeIndex !== null &&
      !isTextareaFocused &&
      event.key === "Backspace"
    ) {
      event.preventDefault();

      handleDelete(selectedShapeIndex);
    }
  };

  useGesture(
    {
      onMouseDown: (event) => {
        const now = performance.now();

        const timeSinceLastClick = now - lastClickTime.current;
        const canvas = canvasRef.current;
        if (!canvas) return;

        const clickX = event.event.clientX - canvas.offsetLeft;
        const clickY = event.event.clientY - canvas.offsetTop;

        if (timeSinceLastClick < DOUBLE_CLICK_TIME_THRESHOLD) {
          clickCount.current++;

          const newShape = new Shape({
            position: { x: clickX, y: clickY },
          });

          setShapes((prevShapes) => [...prevShapes, newShape]);
          setSelectedShapeIndex(shapes.length);
          setCurrentText("");

          setTimeout(() => {
            textareaRef.current?.focus();
          }, 0);

          return;
        }

        lastClickTime.current = now;

        const clickedShapeIndex = findClickedShapeIndex(
          event.event.clientX,
          event.event.clientY
        );
        if (clickedShapeIndex === undefined) return;

        longPressTimer.current = setTimeout(() => {
          if (selectedShapeIndex !== null && isTouchDevice()) {
            handleDelete(selectedShapeIndex);
          }
        }, LONG_PRESS_THRESHOLD);
      },

      onMouseUp: () => {
        if (longPressTimer.current) {
          clearTimeout(longPressTimer.current);
        }
      },

      onMouseLeave: () => {
        if (longPressTimer.current) {
          clearTimeout(longPressTimer.current);
        }
      },

      onDragStart: ({ xy: [clientX, clientY] }) => {
        dragCount.current = 0;

        if (longPressTimer.current) {
          clearTimeout(longPressTimer.current);
        }

        const clickedShapeIndex = findClickedShapeIndex(clientX, clientY);
        if (clickedShapeIndex === undefined) return;

        if (clickedShapeIndex !== -1) {
          setSelectedShapeIndex(clickedShapeIndex);
          setCurrentText(shapes[clickedShapeIndex].content);
          setDraggingIndex(clickedShapeIndex);
          setInitialPosition({
            x: shapes[clickedShapeIndex].position.x,
            y: shapes[clickedShapeIndex].position.y,
          });
        } else {
          setSelectedShapeIndex(null);
        }
      },

      onDrag: ({ movement: [mx, my] }) => {
        if (draggingIndex === null) return;

        if (isTouchDevice()) {
          const currentDirection = mx > 0 ? "right" : "left";

          if (
            lastDragDirection.current &&
            currentDirection !== lastDragDirection.current
          ) {
            dragCount.current++;
          }

          lastDragDirection.current = currentDirection;

          if (dragCount.current >= DRAG_REPEAT_THRESHOLD) {
            handleDelete(draggingIndex);
            setDraggingIndex(null);
            dragCount.current = 0;
            return;
          }
        }

        setShapes((prevShapes) =>
          prevShapes.map((shape, index) => {
            if (index === draggingIndex) {
              shape.setPosition(initialPosition.x + mx, initialPosition.y + my);
            }
            return shape;
          })
        );
      },

      onDragEnd: () => {
        setDraggingIndex(null);
      },
    },
    {
      target: canvasRef,
      eventOptions: { passive: false },
      drag: { threshold: 0 },
    }
  );

  return {
    shapes,
    setShapes,
    selectedShapeIndex,
    currentText,
    setCurrentText,
    handleDeleteKey,
  };
};

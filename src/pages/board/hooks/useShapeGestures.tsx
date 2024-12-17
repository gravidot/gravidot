import { useBoardStore } from "@/entities/board/store";
import { createNode, deleteNode, updateNodeShape } from "@/entities/node/api";
import { Shape } from "@/entities/node/model/shape";
import { useNodesStore } from "@/entities/node/store";
import { useDebounceCallback } from "@/shared/hooks/useDebounce";
import { useGesture } from "@use-gesture/react";
import { RefObject, useCallback, useEffect, useRef, useState } from "react";

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
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  const [shapes, setShapes] = useState<Shape[]>([]);
  const [selectedShapeIndex, setSelectedShapeIndex] = useState<number | null>(
    null
  );
  const [currentText, setCurrentText] = useState<string>("");
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
  const [initialPosition, setInitialPosition] = useState({ x: 0, y: 0 });

  const lastClickTime = useRef<number>(0);
  const longPressTimer = useRef<NodeJS.Timeout | null>(null);
  const dragCount = useRef<number>(0);
  const lastDragDirection = useRef<"left" | "right" | null>(null);
  const isDeletedShape = useRef<boolean>(false);
  const deletedShapesHistory = useRef<{ shape: Shape; index: number }[]>([]);

  const boardId = useBoardStore((state) => state.id);
  const transform = useBoardStore((state) => state.transform);
  const nodes = useNodesStore((state) => state.nodes);

  const isTouchDevice = useCallback(
    () => "ontouchstart" in window || navigator.maxTouchPoints > 0,
    []
  );

  const findClickedShapeIndex = useCallback(
    (clientX: number, clientY: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return null;

      const clickX = clientX - canvas.offsetLeft;
      const clickY = clientY - canvas.offsetTop;

      return shapes.findIndex(
        (shape) =>
          clickX >= shape.position.x - shape.size.w &&
          clickX <= shape.position.x + shape.size.w &&
          clickY >= shape.position.y - shape.size.h &&
          clickY <= shape.position.y + shape.size.h
      );
    },
    [canvasRef, shapes]
  );

  const handleUndo = useCallback(() => {
    if (deletedShapesHistory.current.length === 0) return;

    const { shape, index } = deletedShapesHistory.current.pop()!;
    setShapes((prev) => {
      const newShapes = [...prev];
      newShapes.splice(index, 0, shape);
      return newShapes;
    });
  }, []);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const isUndoShortcut =
        (event.ctrlKey && event.key === "z") ||
        (event.metaKey && event.key === "z");

      if (isUndoShortcut) {
        event.preventDefault();
        handleUndo();
      }
    },
    [handleUndo]
  );

  const handleDelete = useCallback(
    async (index: number) => {
      const nodeToDelete = nodes[index];

      if (nodeToDelete?.id) {
        isDeletedShape.current = true;
        const shapeToDelete = shapes[index];
        deletedShapesHistory.current.push({ shape: shapeToDelete, index });

        setShapes((prev) => prev.filter((_, i) => i !== index));
        await deleteNode(nodeToDelete.id);
      }
    },
    [nodes, shapes]
  );

  const handleDeleteKey = useCallback(
    (event: KeyboardEvent) => {
      if (
        selectedShapeIndex !== null &&
        textareaRef.current !== document.activeElement &&
        event.key === "Backspace"
      ) {
        event.preventDefault();
        handleDelete(selectedShapeIndex);
      }
    },
    [selectedShapeIndex, handleDelete, textareaRef]
  );

  const updateShapeContent = (text: string) => {
    setCurrentText(text);

    if (selectedShapeIndex !== null) {
      setShapes((prevShapes) =>
        prevShapes.map((shape, index) => {
          if (ctx && index === selectedShapeIndex) {
            shape.setContent(ctx, text);
          }
          return shape;
        })
      );

      const node = nodes[selectedShapeIndex];
      if (node?.id) {
        debouncedUpdateNodeShape(node.id, { content: text });
      }
    }
  };

  const debouncedUpdateNodeShape = useDebounceCallback(async (id, updates) => {
    if (!isDeletedShape.current) {
      await updateNodeShape(id, { ...updates });
    }
  }, 500);

  const drawShapes = useCallback(
    (ctx: CanvasRenderingContext2D) => {
      ctx.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);

      shapes.forEach((shape, index) => {
        shape.draw({
          canvasRef: canvasRef,
          transform: transform,
          isSelected: index === selectedShapeIndex,
        });
      });
    },
    [shapes, selectedShapeIndex, canvasRef, transform]
  );

  useEffect(() => {
    setShapes(nodes.map(({ shape }) => new Shape(shape)));
  }, [nodes]);

  useEffect(() => {
    if (ctx) {
      drawShapes(ctx);
    }

    document.addEventListener("keyup", handleDeleteKey);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keyup", handleDeleteKey);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [ctx, drawShapes, handleDeleteKey, handleKeyDown]);

  useEffect(() => {
    handleUndo();
  }, [handleUndo]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;

      const context = canvas.getContext("2d");

      if (context) {
        context.scale(dpr, dpr);
        setCtx(context);
      }
    }
  }, [canvasRef]);

  useGesture(
    {
      onMouseDown: async (event) => {
        const now = performance.now();
        const canvas = canvasRef.current;
        if (!canvas) return;

        const clickX = event.event.clientX - canvas.offsetLeft;
        const clickY = event.event.clientY - canvas.offsetTop;

        if (
          now - lastClickTime.current < DOUBLE_CLICK_TIME_THRESHOLD &&
          boardId
        ) {
          const newShape = new Shape({ position: { x: clickX, y: clickY } });
          setShapes((prev) => [...prev, newShape]);
          await createNode(boardId, newShape);
          setSelectedShapeIndex(shapes.length);
          setCurrentText("");
          textareaRef.current?.focus();
          return;
        }

        lastClickTime.current = now;

        const index = findClickedShapeIndex(
          event.event.clientX,
          event.event.clientY
        );
        if (index === null) return;

        if (isTouchDevice()) {
          longPressTimer.current = setTimeout(() => {
            if (selectedShapeIndex !== null) {
              handleDelete(selectedShapeIndex);
            }
          }, LONG_PRESS_THRESHOLD);
        }
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

      onDragStart: ({ xy: [x, y] }) => {
        dragCount.current = 0;

        if (longPressTimer.current) {
          clearTimeout(longPressTimer.current);
        }

        const index = findClickedShapeIndex(x, y);
        if (index !== null && index !== -1) {
          setSelectedShapeIndex(index);
          setDraggingIndex(index);
          setInitialPosition({
            x: shapes[index].position.x,
            y: shapes[index].position.y,
          });
          setCurrentText(shapes[index].content);
        } else {
          setSelectedShapeIndex(null);
        }
      },

      onDrag: ({ movement: [mx, my] }) => {
        if (draggingIndex === null) return;

        if (isTouchDevice()) {
          isDeletedShape.current = false;
          const currentDirection = mx > 0 ? "right" : "left";

          if (
            lastDragDirection.current &&
            currentDirection !== lastDragDirection.current
          ) {
            dragCount.current++;
          }

          lastDragDirection.current = currentDirection;

          if (dragCount.current >= DRAG_REPEAT_THRESHOLD) {
            isDeletedShape.current = true;
            handleDelete(draggingIndex);
            setDraggingIndex(null);
            dragCount.current = 0;
            return;
          }
        }

        if (draggingIndex === null || isDeletedShape.current) return;

        const newPosition = {
          x: initialPosition.x + mx,
          y: initialPosition.y + my,
        };

        setShapes((prev) =>
          prev.map((shape, i) => {
            if (i === draggingIndex) {
              shape.setPosition(newPosition.x, newPosition.y);
              return shape;
            }
            return shape;
          })
        );

        const node = nodes[draggingIndex];
        if (node?.id && (mx !== 0 || my !== 0)) {
          debouncedUpdateNodeShape(node.id, { position: newPosition });
        }
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
    updateShapeContent,
    handleDeleteKey,
  };
};

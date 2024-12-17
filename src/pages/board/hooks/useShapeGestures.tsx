import { useBoardStore } from "@/entities/board/store";
import { createNode, deleteNode, updateNodeShape } from "@/entities/node/api";
import { DotNode } from "@/entities/node/model";
import { Shape } from "@/entities/node/model/shape";
import { useNodesStore } from "@/entities/node/store";
import { useDebounceCallback } from "@/shared/hooks/useDebounce";
import { useGesture } from "@use-gesture/react";
import { RefObject, useCallback, useEffect, useRef, useState } from "react";
import { useMultiTouch } from "./useMultiTouch";

const DOUBLE_CLICK_TIME_THRESHOLD = 250;
const LONG_PRESS_THRESHOLD = 500;
const DRAG_REPEAT_THRESHOLD = 8;

export const useShapeGestures = ({
  isActive,
  canvasRef,
  textareaRef,
}: {
  isActive: boolean;
  canvasRef: RefObject<HTMLCanvasElement>;
  textareaRef: RefObject<HTMLTextAreaElement>;
}) => {
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  const [shapes, setShapes] = useState<Shape[]>([]);
  const [selectedShapeIndex, setSelectedShapeIndex] = useState<number | null>(
    null
  );
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

  const updateShape = (index: number, updates: Partial<Shape>) => {
    setShapes((prev) =>
      prev.map((shape, i) => {
        if (i === index) {
          if (updates.scale !== undefined) {
            shape.setScale(updates.scale);
          }
          if (updates.rotation !== undefined) {
            shape.setRotate(updates.rotation);
          }
          if (updates.position) {
            shape.setPosition(updates.position.x, updates.position.y);
          }
        }
        return shape;
      })
    );

    const node: DotNode = nodes[index];

    if (node?.id) {
      debouncedUpdateNodeShape(node.id, { ...shapes[index] });
    }
  };

  const debouncedUpdateNodeShape = useDebounceCallback(async (id, updates) => {
    if (!isActive) return;

    if (!isDeletedShape.current) {
      await updateNodeShape(id, { ...updates });
    }
  }, 500);

  const { handleTouchMove, handleTouchEnd, touchPoints } = useMultiTouch(
    isActive,
    selectedShapeIndex,
    updateShape
  );

  useEffect(() => {
    if (!isActive) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.addEventListener("touchmove", handleTouchMove);
    canvas.addEventListener("touchend", handleTouchEnd);
    canvas.addEventListener("touchcancel", handleTouchEnd);

    return () => {
      canvas.removeEventListener("touchmove", handleTouchMove);
      canvas.removeEventListener("touchend", handleTouchEnd);
      canvas.removeEventListener("touchcancel", handleTouchEnd);
    };
  }, [handleTouchMove, handleTouchEnd, isActive, canvasRef]);

  const isTouchDevice = useCallback(
    () => "ontouchstart" in window || navigator.maxTouchPoints > 0,
    []
  );

  const findClickedShapeIndex = useCallback(
    (clientX: number, clientY: number) => {
      if (!isActive || !canvasRef.current) return null;

      const canvas = canvasRef.current;
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
    [canvasRef, shapes, isActive]
  );

  const handleUndo = useCallback(() => {
    if (!isActive || deletedShapesHistory.current.length === 0) return;

    const { shape, index } = deletedShapesHistory.current.pop()!;
    setShapes((prev) => {
      const newShapes = [...prev];
      newShapes.splice(index, 0, shape);
      return newShapes;
    });
  }, [isActive]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!isActive) return;

      const isUndoShortcut =
        (event.ctrlKey && event.key === "z") ||
        (event.metaKey && event.key === "z");

      if (isUndoShortcut) {
        event.preventDefault();
        handleUndo();
      }
    },
    [handleUndo, isActive]
  );

  const handleDelete = useCallback(
    async (index: number) => {
      if (!isActive) return;

      const nodeToDelete = nodes[index];

      if (nodeToDelete?.id) {
        isDeletedShape.current = true;
        const shapeToDelete = shapes[index];
        deletedShapesHistory.current.push({ shape: shapeToDelete, index });

        setShapes((prev) => prev.filter((_, i) => i !== index));
        await deleteNode(nodeToDelete.id);
      }
    },
    [nodes, shapes, isActive]
  );

  const handleDeleteKey = useCallback(
    (event: KeyboardEvent) => {
      if (!isActive) return;

      if (
        selectedShapeIndex !== null &&
        textareaRef.current !== document.activeElement &&
        event.key === "Backspace"
      ) {
        event.preventDefault();
        handleDelete(selectedShapeIndex);
      }
    },
    [selectedShapeIndex, handleDelete, textareaRef, isActive]
  );

  const updateShapeContent = (text: string) => {
    if (!isActive) return;

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

  const drawShapes = useCallback(
    (ctx: CanvasRenderingContext2D) => {
      if (!isActive) return;

      ctx.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);

      shapes.forEach((shape, index) => {
        shape.draw({
          canvasRef: canvasRef,
          transform: transform,
          isSelected: index === selectedShapeIndex,
        });
      });
    },
    [shapes, selectedShapeIndex, canvasRef, transform, isActive]
  );

  useEffect(() => {
    if (!isActive) return;

    setShapes(nodes.map(({ shape }) => new Shape(shape)));
  }, [nodes, isActive]);

  useEffect(() => {
    if (!isActive) return;

    if (ctx) {
      drawShapes(ctx);
    }

    document.addEventListener("keyup", handleDeleteKey);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keyup", handleDeleteKey);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [ctx, drawShapes, handleDeleteKey, handleKeyDown, isActive]);

  useEffect(() => {
    if (!isActive) return;

    handleUndo();
  }, [handleUndo, isActive]);

  useEffect(() => {
    if (!isActive) return;

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
  }, [canvasRef, isActive]);

  useGesture(
    {
      onMouseDown: async (event) => {
        if (!isActive) return;
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
        if (!isActive) return;
        if (longPressTimer.current) {
          clearTimeout(longPressTimer.current);
        }
      },

      onMouseLeave: () => {
        if (!isActive) return;
        if (longPressTimer.current) {
          clearTimeout(longPressTimer.current);
        }
      },

      onDragStart: ({ xy: [x, y] }) => {
        if (!isActive) return;
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
        } else {
          setSelectedShapeIndex(null);
        }
      },

      onDrag: ({ movement: [mx, my] }) => {
        if (!isActive || draggingIndex === null) return;

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

        updateShape(draggingIndex, { position: newPosition });
      },

      onDragEnd: () => {
        if (!isActive) return;
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
    selectedShapeIndex,
    updateShapeContent,
    touchPoints,
  };
};

import {
  ColorType,
  GravidotEdge,
  GravidotNode,
  ShapeTypeConst,
} from "@/entities/node/model";
import { getRandomValue } from "@/shared/utils/getRandomValue";
import {
  OnInit,
  ReactFlowInstance,
  useNodesState,
  Viewport,
} from "@xyflow/react";
import { RefObject, useCallback, useEffect, useRef, useState } from "react";
import { useMultiTouch } from "./useMultiTouch";

const DRAG_REPEAT_THRESHOLD = 8;
const DOUBLE_CLICK_TIME_THRESHOLD = 250;
const DRAG_RESET_TIMEOUT = 250;

export const useShapeGestures = ({
  isActive,
  divBoardRef,
  selectedNodeId,
}: {
  isActive: boolean;
  divBoardRef: RefObject<HTMLDivElement>;
  selectedNodeId: string | null;
}) => {
  const [nodes, setNodes, onNodesChange] = useNodesState<GravidotNode>([]);
  const [lastClickTime, setLastClickTime] = useState<number>(0);

  const dragCount = useRef<number>(0);
  const lastDragDirection = useRef<"left" | "right" | null>(null);
  const dragResetTimer = useRef<NodeJS.Timeout | null>(null);
  const isDragging = useRef(false);

  const previousPosition = useRef<number | null>(null);

  const deletedNodesHistory = useRef<GravidotNode[]>([]);
  const createdNodesHistory = useRef<GravidotNode[]>([]);

  const reactFlowInstance = useRef<ReactFlowInstance<
    GravidotNode,
    GravidotEdge
  > | null>(null);

  const isTouchDevice = useCallback(
    () => "ontouchstart" in window || navigator.maxTouchPoints > 0,
    []
  );

  const {
    handleTouchMove,
    handleTouchEnd,
    handleNodesChange,
    touchPoints,
    isMultiTouchActive,
  } = useMultiTouch(isActive, selectedNodeId, nodes, onNodesChange);

  useEffect(() => {
    if (!isActive) return;

    const board = divBoardRef.current;
    if (!board) return;

    board.addEventListener("touchmove", handleTouchMove);
    board.addEventListener("touchend", handleTouchEnd);
    board.addEventListener("touchcancel", handleTouchEnd);

    return () => {
      board.removeEventListener("touchmove", handleTouchMove);
      board.removeEventListener("touchend", handleTouchEnd);
      board.removeEventListener("touchcancel", handleTouchEnd);
    };
  }, [isActive, divBoardRef, handleTouchMove, handleTouchEnd]);

  const handleUndo = useCallback(() => {
    if (!isActive) return;

    if (createdNodesHistory.current.length > 0) {
      const createdNode = createdNodesHistory.current.pop()!;

      setNodes((prev) => prev.filter((node) => node.id !== createdNode.id));
      return;
    }

    if (deletedNodesHistory.current.length > 0) {
      const node = deletedNodesHistory.current.pop()!;

      setNodes((prev) => [...prev, node]);
    }
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
        return;
      }
    },
    [isActive, handleUndo]
  );

  useEffect(() => {
    if (!isActive) return;
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown, isActive]);

  const handlePaneDoubleClick = useCallback(
    (event: React.MouseEvent) => {
      const currentTime = new Date().getTime();

      if (currentTime - lastClickTime < DOUBLE_CLICK_TIME_THRESHOLD) {
        if (!reactFlowInstance.current) return;

        const viewport: Viewport =
          reactFlowInstance.current.toObject().viewport;

        const size = { w: 140, h: 140 };

        const position = {
          x: (event.clientX - viewport.x - size.w / 2) / viewport.zoom,
          y: (event.clientY - viewport.y - size.h / 2) / viewport.zoom,
        };

        const randomType = getRandomValue(ShapeTypeConst)().value;

        const newNode = {
          id: `${nodes.length + 1}`,
          type: "shape",
          position,
          data: {
            type: randomType,
            content: `${randomType}`,
            size,
            color: getRandomValue(ColorType)().value,
            scale: 1,
            rotation: 0,
          },
        };

        createdNodesHistory.current.push(newNode);

        setNodes((prevNodes) => [...prevNodes, newNode]);
      }

      setLastClickTime(currentTime);
    },
    [lastClickTime, nodes, setNodes]
  );

  const handleDeleteNode = useCallback((nodeId: string | null) => {
    if (!nodeId) return;

    if (isMultiTouchActive.current) {
      return;
    }

    setNodes((prevNodes) => {
      const nodeToDelete = prevNodes.find((node) => node.id === nodeId);
      if (!nodeToDelete) return prevNodes;

      deletedNodesHistory.current.push(nodeToDelete);
      return prevNodes.filter((node) => node.id !== nodeId);
    });
  }, []);

  const handleNodeDragStart = (event: React.MouseEvent | React.TouchEvent) => {
    if (isTouchDevice()) {
      const startX =
        "touches" in event ? event.touches[0].clientX : event.clientX;
      previousPosition.current = startX;
      isDragging.current = true;
    }
  };

  const handleNodeDrag = (event: React.MouseEvent | React.TouchEvent) => {
    if (!isActive || selectedNodeId === null || !isDragging.current) return;

    if (isTouchDevice()) {
      if ("touches" in event && event.touches.length > 1) {
        dragCount.current = 0;
        lastDragDirection.current = null;
        return;
      }

      const currentX =
        "touches" in event ? event.touches[0].clientX : event.clientX;

      if (previousPosition.current === null) {
        previousPosition.current = currentX;
        return;
      }

      const currentDirection =
        currentX > previousPosition.current ? "right" : "left";

      if (
        lastDragDirection.current &&
        currentDirection !== lastDragDirection.current
      ) {
        dragCount.current++;

        if (dragResetTimer.current) {
          clearTimeout(dragResetTimer.current);
        }

        dragResetTimer.current = setTimeout(() => {
          dragCount.current = 0;
          lastDragDirection.current = null;
        }, DRAG_RESET_TIMEOUT);
      }

      lastDragDirection.current = currentDirection;
      previousPosition.current = currentX;

      if (dragCount.current >= DRAG_REPEAT_THRESHOLD) {
        handleDeleteNode(selectedNodeId);

        dragCount.current = 0;
        lastDragDirection.current = null;
        previousPosition.current = null;
        isDragging.current = false;

        if (dragResetTimer.current) {
          clearTimeout(dragResetTimer.current);
          dragResetTimer.current = null;
        }
      }
    }
  };

  const handleNodeDragEnd = () => {
    if (isTouchDevice()) {
      isDragging.current = false;
      previousPosition.current = null;
    }
  };

  const handleStoreDeleteHistory = async ({
    nodes,
    edges,
  }: {
    nodes: GravidotNode[];
    edges: GravidotEdge[];
  }): Promise<boolean | { nodes: GravidotNode[]; edges: GravidotEdge[] }> => {
    const nodeToDelete = nodes.find((node) => node.id === selectedNodeId);

    if (!nodeToDelete) return false;

    deletedNodesHistory.current.push(nodeToDelete);
    return { nodes, edges };
  };

  const onInit: OnInit<GravidotNode, GravidotEdge> = useCallback((instance) => {
    reactFlowInstance.current = instance;
  }, []);

  return {
    nodes,
    touchPoints,
    handlePaneDoubleClick,
    handleNodeDragStart,
    handleNodeDrag,
    handleNodeDragEnd,
    handleStoreDeleteHistory,
    handleNodesChange,
    onInit,
  };
};

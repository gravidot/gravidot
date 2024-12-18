import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { DotNode } from "../model";
import { Shape } from "../model/shape";

type NodesState = {
  nodes: DotNode[];
  addNode: (node: DotNode) => void;
  addAllNodes: (nodes: DotNode[]) => void;
  updateNode: (updatedNode: DotNode) => void;
  removeNode: (nodeId: string) => void;
  updateNodeShape: (nodeId: string, newContent: Partial<Shape>) => void;
  clearNode: () => void;
};

export const useNodesStore = create<NodesState>()(
  persist(
    (set) => ({
      nodes: [],

      addNode: (node: DotNode) =>
        set((state) => ({ nodes: [...state.nodes, node] })),

      addAllNodes: (nodes: DotNode[]) => set({ nodes }),

      updateNode: (updatedNode: DotNode) =>
        set((state) => ({
          nodes: state.nodes.map((node) =>
            node.id === updatedNode.id ? updatedNode : node
          ),
        })),

      removeNode: (nodeId: string) =>
        set((state) => ({
          nodes: state.nodes.filter((node) => node.id !== nodeId),
        })),

      updateNodeShape: (id, updates) =>
        set((state) => ({
          nodes: state.nodes.map((node) =>
            node.id === id
              ? {
                  ...node,
                  shape: new Shape({ ...node.shape, ...updates }),
                }
              : node
          ),
        })),

      clearNode: () => {
        set(() => ({
          nodes: [],
        }));
      },
    }),
    {
      name: "node-storage",
      storage:
        typeof window !== "undefined"
          ? createJSONStorage(() => localStorage)
          : undefined,
    }
  )
);

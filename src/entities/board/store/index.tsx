import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { Board, BoardTransform } from "../model";

export type BoardState = Board & {
  setId: () => void;
  setName: (name: string) => void;
  setTransform: (
    transform: (prevTransform: BoardTransform) => BoardTransform
  ) => void;
};

const initialStore = {
  id: null,
  name: "Untitled",
  transform: {
    x: 0,
    y: 0,
    zoomScale: 1,
  },
};

export const useBoardStore = create<BoardState>()(
  persist(
    (set) => ({
      ...initialStore,

      setId: () => {
        set((state) => ({
          id: state.id,
        }));
      },

      setName: (value) => {
        set(() => ({
          name: value,
        }));
      },

      setTransform: (updater) =>
        set((state) => ({
          ...state,
          transform: updater(state.transform),
        })),
    }),
    {
      name: "board-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

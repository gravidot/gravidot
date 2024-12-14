import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { Board, BoardTransform } from "../model";

type BoardState = Board & {
  updateBoard: (boardData: Partial<Board>) => void;
  setName: (name: string) => void;
  setTransform: (
    updater: (prevTransform: BoardTransform) => BoardTransform
  ) => void;
  clearBoard: () => void;
};

const initialBoardState = {
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
      ...initialBoardState,

      updateBoard: (boardData: Partial<Board>) => {
        set((state) => ({
          ...state,
          ...boardData,
        }));
      },

      setName: (name) => {
        set((state) => ({
          ...state,
          name,
        }));
      },

      setTransform: (updater) => {
        set((state) => ({
          ...state,
          transform: updater(state.transform),
        }));
      },

      clearBoard: () => {
        set(() => ({
          id: undefined,
          ...initialBoardState,
        }));
      },
    }),
    {
      name: "board-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

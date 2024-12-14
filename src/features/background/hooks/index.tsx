import { create } from "zustand";

export interface BoardTransform {
  x: number;
  y: number;
  zoomScale: number;
}

export type BackgroundState = {
  name: string;
  transform: BoardTransform;
  setName: (name: string) => void;
  setTransform: (
    transform: (prevTransform: BoardTransform) => BoardTransform
  ) => void;
};

const initialStore = {
  name: "Untitled",
  transform: { x: 0, y: 0, zoomScale: 1 },
};

export const useBackgroundStore = create<BackgroundState>((set) => ({
  ...initialStore,

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
}));

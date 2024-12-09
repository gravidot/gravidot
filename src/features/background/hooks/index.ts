import { create } from "zustand";

export interface CanvasTransform {
  x: number;
  y: number;
  zoomScale: number;
}

export type BackgroundState = {
  name: string;
  transform: CanvasTransform;
  setName: (name: string) => void;
  setTransform: (
    transform: (prevTransform: CanvasTransform) => CanvasTransform
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

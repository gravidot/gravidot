import { create } from "zustand";

export interface CanvasTransform {
  x: number;
  y: number;
  zoomScale: number;
}

export type BackgroundState = {
  transform: CanvasTransform;
  setTransform: (
    transform: (prevTransform: CanvasTransform) => CanvasTransform
  ) => void;
};

const initialStore = {
  transform: { x: 0, y: 0, zoomScale: 1 },
};

export const useBackgroundStore = create<BackgroundState>((set) => ({
  ...initialStore,

  setTransform: (updater) =>
    set((state) => ({
      ...state,
      transform: updater(state.transform),
    })),
}));

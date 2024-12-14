export interface BoardTransform {
  x: number;
  y: number;
  zoomScale: number;
}

export interface Board {
  id?: string;
  name: string;
  transform: BoardTransform;
}

export interface BoardTransform {
  x: number;
  y: number;
  zoomScale: number;
}

export interface Board {
  id: string | null;
  name: string;
  transform: BoardTransform;
  createdAt?: string;
  updatedAt?: string;
}

export const ColorType = {
  blue: { fill: "rgb(170, 235, 240)" },
  green: { fill: "rgb(215, 255, 165)" },
  pink: { fill: "rgb(255, 180, 215)" },
  purple: { fill: "rgb(200, 200, 250)" },
  transparent: { fill: "rgba(230, 230, 230, 0.25)" },
  yellow: { fill: "rgb(255, 240, 140)" },
} as const;

export type Color = (typeof ColorType)[keyof typeof ColorType];

export const Vertex = {
  circle: 0,
  square: 4,
  pentagon: 5,
  hexagon: 6,
  star: 10,
} as const;

export const Shadow = {
  shadowColor: "rgba(200, 200, 200, 0.2)",
  offsetX: 0,
  offsetY: 12,
  blur: 50,
} as const;

export interface Position {
  x: number;
  y: number;
}

export interface Size {
  w: number;
  h: number;
}

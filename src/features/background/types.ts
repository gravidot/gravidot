export const enum BackgroundPattern {
  Dots = "dots",
  Lines = "lines",
  None = "none",
}

export type DotPatternProps = {
  radius: number;
};

export type LinePatternProps = {
  distance: number;
  lineWidth: number;
};

export type BackgroundProps = {
  pattern?: BackgroundPattern;
  radius?: number;
  lineWidth?: number;
  gap?: number;
};

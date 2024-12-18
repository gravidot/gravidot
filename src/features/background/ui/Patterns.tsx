import { DotPatternProps, LinePatternProps } from "../types";

const LIGHT_MODE = "#c7c7c7";
const DARK_MODE = "#4d4d4d";

export function DotPattern({ radius = 5 }: DotPatternProps) {
  return (
    <circle
      cx={radius}
      cy={radius}
      r={radius}
      fill="currentColor"
      className="fill-neutral-200 dark:fill-zinc-800"
      data-testid="dot-pattern"
    />
  );
}

export function LinePattern({ distance, lineWidth }: LinePatternProps) {
  return (
    <>
      <path
        d={`M0 0 V${distance}`}
        stroke={LIGHT_MODE}
        strokeWidth={lineWidth}
        data-testid="line-pattern"
        style={{
          stroke: window.matchMedia("(prefers-color-scheme: dark)").matches
            ? DARK_MODE
            : LIGHT_MODE,
        }}
      />
      <path
        d={`M0 0 H${distance}`}
        stroke={LIGHT_MODE}
        strokeWidth={lineWidth}
        className="stroke-neutral-200 dark:fill-zinc-800"
        style={{
          stroke: window.matchMedia("(prefers-color-scheme: dark)").matches
            ? DARK_MODE
            : LIGHT_MODE,
        }}
      />
    </>
  );
}

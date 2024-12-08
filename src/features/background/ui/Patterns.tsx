import { DotPatternProps, LinePatternProps } from "../types";

export function DotPattern({ radius }: DotPatternProps) {
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
        stroke="currentColor"
        strokeWidth={lineWidth}
        className="stroke-neutral-200 dark:fill-zinc-800"
        data-testid="line-pattern"
      />
      <path
        d={`M0 0 H${distance}`}
        stroke="currentColor"
        strokeWidth={lineWidth}
        className="stroke-neutral-200 dark:fill-zinc-800"
      />
    </>
  );
}

import { DotPatternProps, LinePatternProps } from "../../types";

export function DotPattern({ radius }: DotPatternProps) {
  return (
    <circle
      cx={radius}
      cy={radius}
      r={radius}
      fill="currentColor"
      className="fill-slate-200"
      data-testid="dot-pattern"
    />
  );
}

export function LinePattern({ distance, lineWidth }: LinePatternProps) {
  return (
    <div data-testid="line-pattern">
      <path
        d={`M0 0 V${distance}`}
        stroke="currentColor"
        strokeWidth={lineWidth}
        className="stroke-slate-200"
      />
      <path
        d={`M0 0 H${distance}`}
        stroke="currentColor"
        strokeWidth={lineWidth}
        className="stroke-slate-200"
      />
    </div>
  );
}

import { BackgroundPattern } from "@/features/background/types";
import { CircleIcon } from "@/shared/components/CircleIcon";
import { ControlButton } from "@/shared/components/ControlButton";
import { LineIcon } from "@/shared/components/LineIcon";

export default function BackgroundPatternToggle({
  pattern,
  onPatternChange,
}: {
  pattern: BackgroundPattern;
  onPatternChange: (pattern: BackgroundPattern) => void;
}) {
  return (
    <div className="z-20 flex items-center text-black dark:text-white">
      <ControlButton onClick={() => onPatternChange(pattern)}>
        {pattern === BackgroundPattern.Dots ? <CircleIcon /> : <LineIcon />}
      </ControlButton>
    </div>
  );
}

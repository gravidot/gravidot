import { BackgroundPattern } from "@/features/background/types";
import { CircleIcon } from "@/shared/ui/CircleIcon";
import { ControlButton } from "@/shared/ui/ControlButton";
import { LineIcon } from "@/shared/ui/LineIcon";

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

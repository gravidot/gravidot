import { Position } from "@xyflow/react";

import { Shape } from "@/entities/node/model";
import { AutoResizeTextarea } from "@/shared/ui/AutoResizeTextarea";
import { darkenColor } from "@/shared/utils/darkenColor";
import { Handle } from "@xyflow/react";
import { SvgShape } from "./SvgShape";
import { useMemo } from "react";

export function ShapeNodeComponent({
  data: { content, size, type, color, scale, rotation },
}: {
  data: Shape;
}) {
  const style = {
    width: size.w,
    height: size.h,
    color: color.fill,
  };

  const transformStyle = useMemo(
    () => ({
      transform: `rotate(${rotation}deg) scale(${scale})`,
    }),
    [rotation, scale]
  );

  const darkenedColor = darkenColor(color.fill);
  const handlePositions = [
    Position.Top,
    Position.Right,
    Position.Bottom,
    Position.Left,
  ];

  return (
    <div
      className="relative"
      style={{ ...style, transform: transformStyle.transform }}
    >
      <SvgShape type={type} style={style} />
      {handlePositions.map((position) => (
        <Handle
          key={position}
          type={
            position === Position.Top || position === Position.Bottom
              ? "target"
              : "source"
          }
          position={position}
          style={{ backgroundColor: darkenedColor }}
        />
      ))}
      <AutoResizeTextarea
        content={content}
        color={color.fill}
        width={size.w}
        height={size.h}
      />
    </div>
  );
}

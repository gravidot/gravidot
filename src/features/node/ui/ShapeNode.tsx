import { Shape } from "@/entities/node/model";
import { AutoResizeTextarea } from "@/shared/ui/AutoResizeTextarea";
import { DeleteButton } from "@/shared/ui/DeleteButton";
import { darkenColor } from "@/shared/utils/darkenColor";
import { Handle, Position } from "@xyflow/react";
import { useMemo, useState } from "react";
import { SvgShape } from "./SvgShape";

export function ShapeNodeComponent({
  id,
  data: { type, content, size, color, scale, rotation },
  selected,
  onDelete,
}: {
  id: string;
  data: Shape;
  selected: boolean;
  onDelete: (nodeId: string) => void;
}) {
  const [isDeleteButtonVisible, setIsDeleteButtonVisible] = useState(false);

  const toggleDeleteButton = () =>
    setIsDeleteButtonVisible((prevState) => !prevState);

  const handleDelete = () => isDeleteButtonVisible && onDelete(id);

  const style = { width: size.w, height: size.h, color: color.fill };

  const transformStyle = useMemo(
    () => ({
      transform: `rotate(${rotation}deg) scale(${scale})`,
    }),
    [rotation, scale]
  );

  return (
    <div
      className={`${isDeleteButtonVisible && "animate-wiggle"} relative will-change-transform`}
      style={{
        ...style,
        transform: transformStyle.transform,
      }}
      onDoubleClick={toggleDeleteButton}
    >
      <SvgShape type={type} style={style} selected={selected} />
      {Object.values(Position).map((position) => (
        <Handle
          key={position}
          type={
            position === Position.Top || position === Position.Bottom
              ? "target"
              : "source"
          }
          position={position}
          style={{ backgroundColor: darkenColor(color.fill) }}
        />
      ))}
      <AutoResizeTextarea
        content={content}
        color={color.fill}
        width={size.w}
        height={size.h}
      />
      {isDeleteButtonVisible && (
        <DeleteButton
          onClick={handleDelete}
          className="color-red absolute -right-2 -top-2"
        />
      )}
    </div>
  );
}

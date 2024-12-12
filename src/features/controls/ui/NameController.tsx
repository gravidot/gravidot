"use client";

import { useBoardStore } from "@/entities/board/store";
import { ControlInput } from "@/shared/components/ControlInput";
import { useClickOutsideBlur } from "@/shared/hooks/useClickOutsideBlur";
import { useMeasureInputWidth } from "@/shared/hooks/useMeasureInputWidth";
import { useRef } from "react";

export function NameController() {
  const name = useBoardStore((state) => state.name);
  const setName = useBoardStore((state) => state.setName);
  const inputRef = useRef<HTMLInputElement>(null);

  useClickOutsideBlur(inputRef);
  useMeasureInputWidth(inputRef, name);

  return (
    <div
      className="relative w-fit font-bold text-black dark:text-white"
      data-testid="name-controller"
    >
      <ControlInput
        title="canvas name"
        id="name-input"
        value={name}
        onChange={(event) => {
          setName(event.target.value);
        }}
        ref={inputRef}
        data-testid="name-input"
      />
    </div>
  );
}
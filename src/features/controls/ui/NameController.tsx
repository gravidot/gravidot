"use client";

import { fetchBoardsByUserId, updateBoard } from "@/entities/board/api";
import { useBoardStore } from "@/entities/board/store";
import { useUserStore } from "@/entities/user/store";
import { ControlInput } from "@/shared/ui/ControlInput";
import { useClickOutsideBlur } from "@/shared/hooks/useClickOutsideBlur";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { useMeasureInputWidth } from "@/shared/hooks/useMeasureInputWidth";
import { useEffect, useRef } from "react";
import { useShallow } from "zustand/shallow";

export function NameController() {
  const { uid, setBoardIdentifiers } = useUserStore(
    useShallow((state) => ({
      uid: state.uid,
      setBoardIdentifiers: state.setBoardIdentifiers,
    }))
  );

  const { id, name, setName } = useBoardStore(
    useShallow((state) => ({
      id: state.id,
      name: state.name,
      setName: state.setName,
    }))
  );

  const inputRef = useRef<HTMLInputElement>(null);
  const debouncedName = useDebounce(name, 500);

  const handleBlur = () => {
    if (name.trim().length === 0) {
      setName("Untitled");
    }
  };

  useClickOutsideBlur(inputRef);
  useMeasureInputWidth(inputRef, name);

  const nameRef = useRef(name);

  useEffect(() => {
    nameRef.current = name;
  }, [name]);

  useEffect(() => {
    if (id && debouncedName) {
      updateBoard(id, { name: nameRef.current });
    }
  }, [id, debouncedName]);

  useEffect(() => {
    if (uid) {
      fetchBoardsByUserId(uid).then(setBoardIdentifiers);
    }
  }, [uid, setBoardIdentifiers]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  return (
    <div
      className="relative w-fit font-bold text-black dark:text-white"
      data-testid="name-controller"
    >
      <ControlInput
        ref={inputRef}
        title="canvas name"
        id="name-input"
        value={name}
        onChange={handleChange}
        onBlur={handleBlur}
        data-testid="name-input"
      />
    </div>
  );
}

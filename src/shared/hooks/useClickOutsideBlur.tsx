import { RefObject, useEffect } from "react";

export function useClickOutsideBlur(
  ref: RefObject<HTMLElement>,
  optionCallback?: () => void | Promise<void>,
  whenEnterCallback?: () => void | Promise<void>
) {
  useEffect(() => {
    const handleClickOutside = async (event: MouseEvent | PointerEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        ref.current.blur();

        if (optionCallback) {
          await optionCallback();
        }
      }
    };

    const handleEnterKey = async (event: KeyboardEvent) => {
      if (ref.current && event.key === "Enter") {
        event.preventDefault();
        ref.current.blur();

        if (whenEnterCallback) {
          await whenEnterCallback();
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("pointerdown", handleClickOutside);
    document.addEventListener("wheel", handleClickOutside);
    document.addEventListener("keyup", handleEnterKey);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("pointerdown", handleClickOutside);
      document.removeEventListener("wheel", handleClickOutside);
      document.removeEventListener("keyup", handleEnterKey);
    };
  }, [ref, optionCallback, whenEnterCallback]);
}

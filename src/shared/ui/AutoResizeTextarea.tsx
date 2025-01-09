import { useCallback, useRef } from "react";
import { darkenColor } from "../utils/darkenColor";

interface AutoResizeTextareaProps {
  content: string;
  color: string;
  width: number;
  height: number;
}

export function AutoResizeTextarea({
  content,
  color,
  width,
  height,
}: AutoResizeTextareaProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInput = useCallback(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, []);

  return (
    <textarea
      ref={textareaRef}
      value={content}
      className="spellchecker:words absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 transform cursor-text resize-none overflow-hidden bg-transparent py-2 text-center text-sm focus:outline-none"
      style={{
        color: darkenColor(color),
        width: width - 16,
        maxHeight: height - 16,
      }}
      onInput={handleInput}
    />
  );
}

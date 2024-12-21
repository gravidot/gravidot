"use client";

import { useState } from "react";

const COPIED_DURATION_MS = 2000;

export function useCopyWithClipboard() {
  const [isCopied, setIsCopied] = useState(false);
  const [copiedContent, setCopiedContent] = useState("");

  const handleCopyContent = async (
    event: React.MouseEvent<HTMLButtonElement>,
    content: string
  ) => {
    event.preventDefault();

    // safari, touch device 호환성을 위해서
    const textarea = document.createElement("textarea");
    document.body.appendChild(textarea);
    textarea.value = content;
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);

    setCopiedContent(content);
    setIsCopied(true);

    setTimeout(() => {
      setCopiedContent("");
      setIsCopied(false);
    }, COPIED_DURATION_MS);
  };

  return { isCopied, copiedContent, handleCopyContent };
}

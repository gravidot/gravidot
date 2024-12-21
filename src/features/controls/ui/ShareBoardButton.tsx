import { ControlButton } from "@/shared/components/ControlButton";
import { ShareIcon } from "@/shared/components/ShareIcon";
import { Snackbar } from "@/shared/components/Snackbar";
import { useCopyWithClipboard } from "@/shared/hooks/copyWithClipboard";
import { usePathname } from "next/navigation";

export function ShareBoardButton() {
  const pathname = usePathname();

  const currentUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}${pathname}&usp=sharing`
      : "";

  const { isCopied, handleCopyContent } = useCopyWithClipboard();

  return (
    <>
      {isCopied && <Snackbar message={`Shared!`} />}
      <ControlButton onClick={(event) => handleCopyContent(event, currentUrl)}>
        <ShareIcon />
      </ControlButton>
    </>
  );
}

import { ControlButton } from "@/shared/ui/ControlButton";
import { ShareIcon } from "@/shared/ui/ShareIcon";
import { Snackbar } from "@/shared/ui/Snackbar";
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

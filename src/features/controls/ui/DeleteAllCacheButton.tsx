import { useBoardStore } from "@/entities/board/store";
import { useNodesStore } from "@/entities/node/store";
import { useUserStore } from "@/entities/user/store";
import { ControlButton } from "@/shared/components/ControlButton";
import { TrashIcon } from "@/shared/components/TrashIcon";
import { clearAllStores } from "@/shared/utils/clearAllStores";
import { useRouter } from "next/navigation";

export function DeleteAllCacheButton() {
  const router = useRouter();

  const clearUser = useUserStore((state) => state.clearUser);
  const clearBoard = useBoardStore((state) => state.clearBoard);
  const clearNode = useNodesStore((state) => state.clearNode);

  const handleClearAll = () => {
    clearAllStores(clearUser, clearBoard, clearNode);
    router.push(`/`, { scroll: false });
  };

  return (
    <ControlButton onClick={handleClearAll}>
      <TrashIcon />
    </ControlButton>
  );
}

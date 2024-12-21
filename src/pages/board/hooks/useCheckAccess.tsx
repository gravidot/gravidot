import { addUserToBoardIfNotExists } from "@/entities/board/api";
import { useUserStore } from "@/entities/user/store";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

export function useCheckAccess() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const url = window.document.location.href;
  const initialUrlRef = useRef<string>(url);

  const userId = useUserStore.getState().uid;

  useEffect(() => {
    const checkAccess = initialUrlRef.current.endsWith("&usp=sharing");

    if (checkAccess) {
      const boardIdByOne = initialUrlRef.current.match(
        /\/([a-f0-9-]{36})&usp=sharing/
      )?.[1];

      if (boardIdByOne && userId) {
        addUserToBoardIfNotExists(userId, boardIdByOne);
        router.push(`/${boardIdByOne}`, { scroll: false });
      } else {
        router.push(`/`, { scroll: false });
      }
    }
  }, [userId, pathname, searchParams, router]);
}

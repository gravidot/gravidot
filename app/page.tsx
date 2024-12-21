"use client";

import { fetchOrCreateBoard } from "@/entities/board/api";
import { Board } from "@/entities/board/model";
import { useBoardStore } from "@/entities/board/store";
import { createUser } from "@/entities/user/api";
import { Loading } from "@/shared/ui/Loading";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

export default function MainPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const hasInitialized = useRef(false);

  const initialize = useCallback(async () => {
    if (hasInitialized.current) {
      return;
    }

    hasInitialized.current = true;
    setLoading(true);

    try {
      const { uid } = await createUser();
      if (!uid) {
        throw new Error("🚑 User ID is null. Cannot create board 🗯️");
      }

      const { id, name } = useBoardStore.getState();
      const board: Board = await fetchOrCreateBoard(uid, id, name);
      router.push(`/${board.id}`, { scroll: false });
    } catch (error) {
      setErrorMessage(
        `🚑 Error: ${error instanceof Error ? error.message : "Unknown error"}`
      );
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    initialize();
  }, [initialize]);

  if (loading) {
    return <Loading />;
  }

  if (errorMessage) {
    return <div>{errorMessage}</div>;
  }

  return null;
}

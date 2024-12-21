"use client";

import { fetchBoardsByUserId, fetchOrCreateBoard } from "@/entities/board/api";
import { Board } from "@/entities/board/model";
import { useBoardStore } from "@/entities/board/store";
import { useUserStore } from "@/entities/user/store";
import { ActivatedCircle } from "@/shared/ui/ActivatedCircle";
import { PlusButton } from "@/shared/ui/PlusButton";
import { useClickOutsideBlur } from "@/shared/hooks/useClickOutsideBlur";
import {
  extractPrefixWithDash,
  extractPrefixWithinTwenty,
} from "@/shared/utils/extractPrefixWith";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useShallow } from "zustand/shallow";

export function BoardController() {
  const router = useRouter();

  const { id: currentBoardId, clearBoard } = useBoardStore(
    useShallow((state) => ({
      id: state.id,
      clearBoard: state.clearBoard,
    }))
  );

  const { uid, name, board_identifiers, setBoardIdentifiers } = useUserStore(
    useShallow((state) => ({
      uid: state.uid,
      name: state.name,
      board_identifiers: state.board_identifiers,
      setBoardIdentifiers: state.setBoardIdentifiers,
    }))
  );

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useClickOutsideBlur(dropdownRef, () => setIsOpen(false));

  const handleFetchBoards = async () => {
    if (uid) {
      const boardIdentifiers = await fetchBoardsByUserId(uid);
      setBoardIdentifiers(boardIdentifiers);
    }
  };

  const handleCreateNewBoard = () => {
    clearBoard();
    router.push(`/`, { scroll: false });
    setIsOpen(false);
  };

  const handleRouteBoard = async (boardId: string, boardName: string) => {
    if (currentBoardId !== boardId && uid) {
      const board: Board = await fetchOrCreateBoard(uid, boardId, boardName);
      router.push(`/${board.id}`, { scroll: false });
    }
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        onClick={() => {
          handleFetchBoards();
          setIsOpen((prev) => !prev);
        }}
        fill="currentColor"
        strokeWidth={1}
        className="mr-1 size-4 cursor-pointer rounded-xl fill-black transition duration-300 ease-in-out hover:bg-slate-100 hover:fill-blue-400 dark:fill-white"
      >
        <path
          fillRule="evenodd"
          d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z"
          clipRule="evenodd"
        />
      </svg>

      {isOpen && (
        <div className="absolute -left-3 top-full mt-5 w-full min-w-60 max-w-80 rounded-xl border border-gray-200 bg-white dark:border-zinc-700 dark:bg-black">
          <h4 className="flex justify-between border-b border-gray-200 px-4 py-2 text-xs font-semibold dark:border-zinc-700 dark:text-white">
            <span className="w-fit">{name}</span>
            <span className="ml-3 font-mono text-blue-400">
              {uid ? extractPrefixWithDash(uid) : "Who Are U"}
            </span>
          </h4>

          <div className="max-h-60 overflow-y-auto border-b">
            {board_identifiers.map(({ id, name }) => (
              <button
                key={id}
                className="flex w-full items-center justify-between px-4 py-2 text-left transition duration-150 ease-in-out hover:bg-gray-100 focus:bg-gray-100 focus:outline-none dark:hover:bg-zinc-800"
                onClick={() => handleRouteBoard(id, name)}
              >
                <span className="pr-2 text-xs font-medium text-gray-900 dark:text-white">
                  {extractPrefixWithinTwenty(name)}
                </span>
                {currentBoardId === id && <ActivatedCircle />}
              </button>
            ))}
          </div>

          <button
            className="flex w-full items-center justify-start px-4 py-2 text-left text-zinc-400 transition duration-150 ease-in-out hover:bg-gray-100 focus:bg-gray-100 focus:outline-none dark:text-zinc-600 dark:hover:bg-zinc-800"
            onClick={handleCreateNewBoard}
          >
            <PlusButton />
            <span className="pl-1.5">Create New Board</span>
          </button>
        </div>
      )}
    </div>
  );
}

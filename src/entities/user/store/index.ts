import { generateRandomAnonUserName } from "@/shared/utils/generateRandomAnonUserName";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { GravidotActiveUser, Role } from "../model";

type UserState = GravidotActiveUser & {
  setUser: (userData: Partial<GravidotActiveUser>) => void;
  setBoardIdentifiers: (boardIdentifiers: Record<string, string>[]) => void;
  clearUser: () => void;
};

const initialState = {
  name: generateRandomAnonUserName(),
  is_anonymous: false,
  role: Role.Owner,
  board_identifiers: [],
  fingers_no: null,
};

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      ...initialState,

      setUser: (userData: Partial<GravidotActiveUser>) => {
        set((state) => ({
          ...state,
          ...userData,
        }));
      },

      setBoardIdentifiers: (boardIdentifiers: Record<string, string>[]) => {
        set((state) => ({
          ...state,
          board_identifiers: [...boardIdentifiers],
        }));
      },

      clearUser: () => set({ uid: undefined, ...initialState }),
    }),
    {
      name: "user-storage",
      storage:
        typeof window !== "undefined"
          ? createJSONStorage(() => localStorage)
          : undefined,
    }
  )
);

import create from "zustand";

type State = {
  isDark: boolean;
  setIsDark: (isDark: boolean) => void;
};

export const useStore = create<State>((set) => ({
  isDark: false,
  setIsDark: (isDark) => set((state) => ({ ...state, isDark })),
}));

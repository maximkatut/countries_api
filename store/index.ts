import create from "zustand";

type State = {
  countries: object[];
  isDark: boolean;
  setCountries: (all: object[]) => void;
  setIsDark: (isDark: boolean) => void;
};

export const useStore = create<State>((set) => ({
  countries: [],
  isDark: false,
  setCountries: (all) => set((state) => ({ ...state, countries: all })),
  setIsDark: (isDark) => set((state) => ({ ...state, isDark })),
}));

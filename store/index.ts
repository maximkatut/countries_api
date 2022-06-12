import create from "zustand";
import { IData } from "../lib/countries";

type State = {
  countries: IData[];
  isDark: boolean;
  setCountries: (all: IData[]) => void;
  setIsDark: (isDark: boolean) => void;
};

export const useStore = create<State>((set) => ({
  countries: [],
  isDark: false,
  setCountries: (all) => set((state) => ({ ...state, countries: all })),
  setIsDark: (isDark) => set((state) => ({ ...state, isDark })),
}));

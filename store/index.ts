import create from "zustand";

type State = {
  countries: object[];
  setCountries: (all: object[]) => void;
};

export const useStore = create<State>((set) => ({
  countries: [],
  setCountries: (all) => set({ countries: all }),
}));

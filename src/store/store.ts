import { create } from "zustand";

type SearchStore = {
  search: string;
  tags: string[];
  setSearch: (search: string) => void;
  setTags: (tags: string[]) => void;
};

export const useSearchStore = create<SearchStore>((set) => ({
  search: "",
  tags: [],

  setSearch: (newSearch) => {
    set(() => ({ search: newSearch }));
  },
  setTags: (newTags) => {
    set(() => ({ tags: newTags }));
  },
}));

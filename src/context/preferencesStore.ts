import {create} from 'zustand';

interface PreferencesState {
  sources: string[];
  categories: string[];
  authors: string[];
  setSources: (sources: string[]) => void;
  setCategories: (categories: string[]) => void;
  setAuthors: (authors: string[]) => void;
}

export const usePreferencesStore = create<PreferencesState>((set) => ({
  sources: [],
  categories: [],
  authors: [],
  setSources: (sources) => set({ sources }),
  setCategories: (categories) => set({ categories }),
  setAuthors: (authors) => set({ authors }),
}));
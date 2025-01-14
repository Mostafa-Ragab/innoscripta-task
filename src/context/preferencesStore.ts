import { create } from 'zustand';
import { fetchAllArticles } from '../api/fetchNews';
import { NewsFilters } from '../types/NewsFilters';

interface PreferencesState {
  sources: string[];
  categories: string[];
  authors: string[];
  articles: any[]; // State to store fetched articles
  loading: boolean; // State to track loading
  totalResults: number; // Total results from the API
  setSources: (sources: string[]) => void;
  setCategories: (categories: string[]) => void;
  setAuthors: (authors: string[]) => void;
  fetchArticles: (filters?: NewsFilters, page?: number) => Promise<void>;
}

export const usePreferencesStore = create<PreferencesState>((set, get) => ({
  sources: [],
  categories: [],
  authors: [],
  articles: [], // Initialize articles state
  loading: false, // Initialize loading state
  totalResults: 0, // Initialize total results state

  setSources: (sources) => set({ sources }),
  setCategories: (categories) => set({ categories }),
  setAuthors: (authors) => set({ authors }),

  fetchArticles: async (filters = {}, page = 1) => {
    const { sources, categories, authors } = get(); // Access current preferences
    const combinedFilters = {
      search: filters.search || '',
      categories: filters.categories?.length ? filters.categories : categories,
      sources: filters.sources?.length ? filters.sources : sources,
      authors: filters.authors?.length ? filters.authors : authors,
      startDate: filters.startDate || '',
      endDate: filters.endDate || '',
    };

    // Prevent duplicate calls
    if (get().loading) return;

    set({ loading: true });

    try {
      const { articles, totalResults } = await fetchAllArticles(combinedFilters, page);
      set({ articles, totalResults });
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      set({ loading: false });
    }
  },
}));
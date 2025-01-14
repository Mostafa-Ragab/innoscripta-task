import { create } from 'zustand';
import { fetchAllArticles } from '../api/fetchNews';
import { NewsFilters } from '../types/NewsFilters';
import {
  guardianInitSections,
  newsApiCategories,
  nyTimesSections,
} from '../utils/constants';

interface NewsPreferences {
  favoriteCategories: string[];
  favoriteSources: string[];
  favoriteAuthors: string[];
}

interface NewsState {
  articles: any[];
  filters: NewsFilters;
  preferences: NewsPreferences;
  guardianCategories: any[];
  newsApiCategories: any[];
  nyTimesCategories: any[];
  loading: boolean;
  page: number;
  totalResults: number;

  setFilters: (filters: NewsFilters) => void;
  fetchArticles: (applyPreferences?: boolean, page?: number) => Promise<void>;
  savePreferences: (preferences: NewsPreferences) => void;
  setPage: (page: number) => void;
  resetFilters: () => void;
}

export const useNewsStore = create<NewsState>((set, get) => ({
  articles: [],
  filters: {
    search: '',
    categories: [],
    startDate: '',
    endDate: '',
    sources: [],
    authors: [],
  },
  preferences: {
    favoriteCategories: [],
    favoriteSources: [],
    favoriteAuthors: [],
  },
  guardianCategories: guardianInitSections,
  nyTimesCategories: nyTimesSections,
  newsApiCategories: newsApiCategories,
  loading: false,
  page: 1,
  totalResults: 0,

  setFilters: (filters) => set({ filters }),

  fetchArticles: async (applyPreferences = false, page = get().page) => {
    const { filters, preferences, loading } = get();
    if (loading) return; // Prevent duplicate calls

    const effectiveFilters = applyPreferences
      ? {
          ...filters,
          categories: filters.categories.length
            ? filters.categories
            : preferences.favoriteCategories,
          sources: filters.sources.length
            ? filters.sources
            : preferences.favoriteSources,
          authors: preferences.favoriteAuthors.length ? preferences.favoriteAuthors : undefined, // Only use authors from preferences
        }
      : {
          search: '',
          categories: [], // Default to no categories
          startDate: '',
          endDate: '',
          sources: [], // Default to all sources
          authors: undefined, // Ignore authors entirely
        };

    set({ loading: true });
    try {
      const { articles, totalResults } = await fetchAllArticles(effectiveFilters, page);
      set({ articles, totalResults });
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      set({ loading: false });
    }
  },

  savePreferences: (preferences) => {
    set((state) => ({
      preferences,
      filters: {
        ...state.filters,
        categories: preferences.favoriteCategories,
        sources: preferences.favoriteSources,
        authors: preferences.favoriteAuthors,
      },
    }));
    localStorage.setItem('preferences', JSON.stringify(preferences));
  },

  setPage: (page) => set({ page }),

  resetFilters: () => {
    const { preferences } = get();
    set({
      filters: {
        search: '',
        categories: preferences.favoriteCategories || [],
        startDate: '',
        endDate: '',
        sources: preferences.favoriteSources || [],
        authors: undefined, // Ensure authors are reset to undefined
      },
    });
  },

  // Load preferences from localStorage on initialization
  ...(() => {
    const storedPreferences = localStorage.getItem('preferences');
    return storedPreferences
      ? {
          preferences: JSON.parse(storedPreferences),
          filters: {
            search: '',
            categories: JSON.parse(storedPreferences).favoriteCategories || [],
            startDate: '',
            endDate: '',
            sources: JSON.parse(storedPreferences).favoriteSources || [],
            authors: undefined, // Set authors to undefined initially
          },
        }
      : {};
  })(),
}));
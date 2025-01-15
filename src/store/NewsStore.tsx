import { create } from 'zustand';
import { fetchAllArticles } from '../api/fetchNews';
import {  NewsState, } from '../types/news';
import {
  guardianInitSectionsList,
  newsApiCategoriesList,
  nyTimesSectionsList,
  sourcesList,
} from '../constants';
import { initializePreferences, mergePreferencesWithFilters } from '../utils/helpers';


// News Store Definition
export const useNewsStore = create<NewsState>((set, get) => ({
  articles: [],
  preferences: initializePreferences(),
  guardianCategories: guardianInitSectionsList,
  nyTimesCategories: nyTimesSectionsList,
  sources: sourcesList,
  newsApiCategories: newsApiCategoriesList,
  loading: false,
  page: 1,
  totalResults: 0,
  filters: {
    search: '',
    categories: [],
    startDate: '',
    endDate: '',
    sources: [],
    authors: [],
  },

  // Set Filters
  setFilters: (filters) =>
    set((state) => ({
      filters: {
        ...state.filters,
        ...filters,
      },
    })),

  // Fetch Articles
  fetchArticles: async (applyPreferences = false, page = get().page) => {
    const { filters, preferences, loading } = get();
    if (loading) return;

    const effectiveFilters = mergePreferencesWithFilters(filters, preferences, applyPreferences);

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

  // Save Preferences
  savePreferences: (preferences) => {
    set({ preferences });
    localStorage.setItem('preferences', JSON.stringify(preferences));
  },

  // Reset Filters
  resetFilters: () => {
    set({
      filters: {
        search: '',
        categories: [],
        startDate: '',
        endDate: '',
        sources: [],
        authors: undefined,
      },
      page: 1, // Reset page as well
    });
  },

  // Set Page
  setPage: (page: number) => set({ page }),
}));
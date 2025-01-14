import { create } from 'zustand';
import { fetchAllArticles } from '../api/fetchNews';
import { NewsFilters } from '../types/NewsFilters';
import {
  guardianInitSectionsList,
  newsApiCategoriesList,
  nyTimesSectionsList,
  sourcesList,
} from '../constants/constants';

interface NewsPreferences {
  favoriteCategories: string[];
  favoriteSources: string[];
  favoriteAuthors: string[];
}

interface NewsState {
  articles: any[];
  filters: NewsFilters;
  preferences: NewsPreferences ;
  guardianCategories: any[];
  newsApiCategories: any[];
  nyTimesCategories: any[];
  loading: boolean;
  page: number;
  totalResults: number;
  sources: any[];
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
  guardianCategories: guardianInitSectionsList,
  nyTimesCategories: nyTimesSectionsList,
  sources: sourcesList,
  newsApiCategories: newsApiCategoriesList,
  loading: false,
  page: 1,
  totalResults: 0,

  setFilters: (filters) =>
    set((state) => ({
      filters: {
        ...state.filters,
        ...filters,
      },
    })),

  fetchArticles: async (applyPreferences = false, page = get().page) => {
    const { filters, preferences,loading } = get();
    if (loading) return; // Prevent duplicate calls

    

    // Construct effective filters
    const effectiveFilters: NewsFilters = applyPreferences 
      ? {
          ...filters,
          categories: preferences.favoriteCategories.length
            ? preferences.favoriteCategories
            : filters.categories,
          sources: preferences.favoriteSources.length
            ? preferences.favoriteSources
            : filters.sources,
          authors: preferences.favoriteAuthors.length
            ? preferences.favoriteAuthors
            : undefined, // Use authors only from preferences
            startDate: '',
        endDate: '',
        }
      : filters;

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
    set({
      preferences,
      filters: {
        ...get().filters,
        
      },
    });
    localStorage.setItem('preferences', JSON.stringify(preferences));
  },
   // Initialize preferences
   ...(() => {
    const storedPreferences = localStorage.getItem('preferences');
    if (storedPreferences) {
      const parsedPreferences: NewsPreferences = JSON.parse(storedPreferences);
      return {
        preferences: parsedPreferences,
      };
    }
    return  {
      favoriteCategories: [],
      favoriteSources: [],
      favoriteAuthors: [],
    };
  })(),

  
  resetFilters: () => {
    set({
      filters: {
        search: '',
        categories: [],
        startDate: '',
        endDate: '',
        sources:  [],
        authors: undefined, // Reset author
      },
    });
    
  },
}));
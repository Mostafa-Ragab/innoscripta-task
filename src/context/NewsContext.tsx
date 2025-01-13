import {create} from 'zustand';
import { fetchAllArticles } from '../api/fetchNews';
import { NewsFilters } from '../types/NewsFilters';
import {
  guardianInitSections,
  newsApiCategories,
  nyTimesSections,
} from '../utils/constants'

interface NewsPreferences {
  favoriteCategories: string[];
  favoriteSources: string[];
  favoriteAuthors: string[];
}

interface NewsState {
  articles: any[];
  filters: NewsFilters;
  setFilters: (filters: NewsFilters) => void;
  fetchArticles: () => Promise<void>;
  preferences: NewsPreferences;
  savePreferences: (preferences: NewsPreferences) => void;
  page: number;
  setPage: (page: number) => void;
  totalResults: number;
  loading: boolean;
  guardianCategories: any[];
  newsApiCategories: any[];
  
  
}

export const useNewsStore = create<NewsState>((set, get) => ({
  articles: [],
  filters: {
    search: '',
    categories: [''],
    startDate: '',
    endDate:'',
    sources: [],
    authors: [],
  },
  preferences: {
    favoriteCategories: ['general'],
    favoriteSources: [],
    favoriteAuthors: [],
  },
  loading: false,
  page: 1,
  totalResults: 0,
  
  guardianCategories: guardianInitSections,
  nyTimesCategories: nyTimesSections,
  newsApiCategories: newsApiCategories,
  setFilters: (filters) => set({ filters }),
  fetchArticles: async () => {
    const { filters, page } = get();
    if (get().loading) return; // Prevent duplicate calls
  
    set({ loading: true });
    try {
      console.log('filters',filters)
      const response = await fetchAllArticles(filters, page);
      set({
        articles: response.articles,
        totalResults: response.totalResults || 0,
      });
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      set({ loading: false });
    }
  },

  savePreferences: (preferences) => {
    set({ preferences });
    localStorage.setItem('preferences', JSON.stringify(preferences));
  },

  setPage: (page) => set({ page }),

  // Load preferences from localStorage on initialization
  ...(() => {
    const storedPreferences = localStorage.getItem('preferences');
    return storedPreferences
      ? { preferences: JSON.parse(storedPreferences) }
      : {};
  })(),
}));
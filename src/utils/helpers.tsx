import { AVAILABLE_SOURCES } from "../constants";
import { Article, NewsFilters, NewsPreferences } from "../types/news";

// Utility function to validate sources
export const validateSources = (sources: string[] = []): string[] =>
    sources.length === 0 ? AVAILABLE_SOURCES : sources.filter((source) => AVAILABLE_SOURCES.includes(source));



    // Helper: Initialize Preferences from LocalStorage
export const initializePreferences = (): NewsPreferences => {
  const storedPreferences = localStorage.getItem('preferences');
  if (storedPreferences) {
    try {
      return JSON.parse(storedPreferences);
    } catch (error) {
      console.error('Failed to parse stored preferences:', error);
    }
  }
  return {
    favoriteCategories: [],
    favoriteSources: [],
    favoriteAuthors: [],
  };
};


// Helper: Merge Preferences and Filters
export const mergePreferencesWithFilters = (
  filters: NewsFilters,
  preferences: NewsPreferences,
  applyPreferences: boolean
): NewsFilters => {
  if (!applyPreferences) return filters;

  return {
    ...filters,
    categories: preferences.favoriteCategories.length
      ? preferences.favoriteCategories
      : filters.categories,
    sources: preferences.favoriteSources.length
      ? preferences.favoriteSources
      : filters.sources,
    authors: preferences.favoriteAuthors.length ? preferences.favoriteAuthors : undefined,
  };
};



// Normalize articles
export const normalizeArticles = (articles: Article[], source: string) =>
  articles.map((article: any) => ({
    title: article.title || article.webTitle,
    description: article.description || '',
    url: article.url || article.webUrl,
    urlToImage: article.urlToImage || '',
    source,
    publishedAt: article.publishedAt || article.webPublicationDate,
  }));
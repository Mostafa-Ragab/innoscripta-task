import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { fetchAllArticles } from '../api/fetchNews';
import { NewsFilters } from '../types/NewsFilters';

interface NewsPreferences {
  favoriteCategories: string[];
  favoriteSources: string[];
  favoriteAuthors: string[];
}

interface NewsContextProps {
  articles: any[];
  filters: NewsFilters;
  setFilters: React.Dispatch<React.SetStateAction<NewsFilters>>;
  fetchArticles: () => Promise<void>;
  preferences: NewsPreferences;
  savePreferences: (newPreferences: NewsPreferences) => void;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  totalResults: number;
  loading: boolean;
}

export const NewsContext = createContext<NewsContextProps | null>(null);

export const NewsProvider = ({ children }: { children: ReactNode }) => {
  const [articles, setArticles] = useState<any[]>([]);
  const [filters, setFilters] = useState<NewsFilters>({
    search: '',
    categories: ['general'],
    date: '',
    sources: [],
    authors: [],
  });
  const [preferences, setPreferences] = useState<NewsPreferences>({
    favoriteCategories: ['general'],
    favoriteSources: [],
    favoriteAuthors: [],
  });
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const response = await fetchAllArticles(filters, page);
      setArticles(response.articles);
      setTotalResults(response.totalResults || 0);
    } finally {
      setLoading(false);
    }
  };

  const savePreferences = (newPreferences: NewsPreferences) => {
    setPreferences(newPreferences);
    localStorage.setItem('preferences', JSON.stringify(newPreferences));
  };

  useEffect(() => {
    const storedPreferences = localStorage.getItem('preferences');
    if (storedPreferences) {
      setPreferences(JSON.parse(storedPreferences));
    }
  }, []);

  useEffect(() => {
    fetchArticles();
  }, [filters, page]);

  return (
    <NewsContext.Provider
      value={{
        articles,
        filters,
        setFilters,
        fetchArticles,
        preferences,
        savePreferences,
        page,
        setPage,
        totalResults,
        loading,
      }}
    >
      {children}
    </NewsContext.Provider>
  );
};

export const useNewsContext = () => {
  const context = useContext(NewsContext);
  if (!context) throw new Error('useNewsContext must be used within a NewsProvider');
  return context;
};
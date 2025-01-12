// src/context/NewsContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Article {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  source: { name: string };
}

export interface Filters {
  category: string;
  source: string;
  date: string;
}

interface NewsContextProps {
  articles: Article[];
  searchQuery: string;
  filters: Filters;
  setArticles: (articles: Article[]) => void;
  setSearchQuery: (query: string) => void;
  setFilters: (filters: Filters) => void;
}

const NewsContext = createContext<NewsContextProps | undefined>(undefined);

export const NewsProvider = ({ children }: { children: ReactNode }) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<Filters>({
    category: '',
    source: '',
    date: '',
  });

  return (
    <NewsContext.Provider
      value={{
        articles,
        searchQuery,
        filters,
        setArticles,
        setSearchQuery,
        setFilters,
      }}
    >
      {children}
    </NewsContext.Provider>
  );
};

export const useNewsContext = () => {
  const context = useContext(NewsContext);
  if (!context) {
    throw new Error('useNewsContext must be used within a NewsProvider');
  }
  return context;
};
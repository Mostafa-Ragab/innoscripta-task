// src/pages/Home.tsx
import React, { useEffect } from 'react';
import { useNewsContext } from '../context/NewsContext';
import { fetchArticles } from '../api/newsAPI';
import { ArticleCard } from '../components/ArticleCard';
import { Filters } from '../components/Filters';

export const Home: React.FC = () => {
  const { articles, searchQuery, filters, setSearchQuery, setFilters } = useNewsContext();

  useEffect(() => {
    const fetchData = async () => {
      const fetchedArticles = await fetchArticles(searchQuery, filters.category, filters.source, filters.date);
      // Assuming setArticles is implemented in context
    };
    fetchData();
  }, [searchQuery, filters]);

  return (
    <div className="mt-20">
      <Filters
        onSearch={setSearchQuery}
        onFilterChange={setFilters}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article, index) => (
          <ArticleCard key={index} {...article} />
        ))}
      </div>
    </div>
  );
};
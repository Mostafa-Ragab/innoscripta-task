import React, { useEffect } from 'react';
import { useNewsContext } from '../context/NewsContext';
import { Loader } from '../components/Loader';
import { ArticleCard } from '../components/ArticleCard';
import { Pagination } from '../components/Pagination';
import { Filters } from '../components/Filters';

export const Home: React.FC = () => {
  const { articles, fetchArticles, loading, preferences, setFilters } = useNewsContext();

  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      categories: preferences.favoriteCategories?.length
        ? preferences.favoriteCategories
        : prev.categories,
      sources: preferences.favoriteSources?.length ? preferences.favoriteSources : prev.sources,
      authors: preferences.favoriteAuthors?.length ? preferences.favoriteAuthors : prev.authors,
    }));
    fetchArticles();
  }, [preferences]);

  return (
    <div className="bg-gray-50 min-h-screen">
        <Filters />
      {loading ? (
        <Loader />
      ) : (
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article, index) => (
              <ArticleCard key={index} {...article} />
            ))}
          </div>
          <Pagination />
        </div>
      )}
    </div>
  );
};
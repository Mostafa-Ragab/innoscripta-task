import React, { useEffect } from 'react';
import {  useNewsStore } from '../context/NewsContext';

import { ArticleCard } from '../components/ArticleCard';
import { Filters } from '../components/Filters';
import { Loader } from '../components/Loader';
import { Pagination } from '../components/Pagination';

export const Home: React.FC = () => {
  const {
    articles,
    filters,
 
    fetchArticles,
    page,
   
    loading,
  } = useNewsStore();

  // Fetch articles whenever filters or page changes
  useEffect(() => {
    fetchArticles();
  }, [filters, page,fetchArticles]);

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters Section */}
        <Filters />

        {/* Articles Section */}
        {loading ? (
          <Loader />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {articles.map((article, index) => (
              <ArticleCard key={index} {...article} />
            ))}
          </div>
        )}

        {/* Pagination Section */}
        <div className="mt-8">
          <Pagination />
        </div>
      </div>
    </div>
  );
};
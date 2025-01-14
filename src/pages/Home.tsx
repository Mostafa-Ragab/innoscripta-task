import React, { useEffect } from 'react';
import { useNewsStore } from '../context/NewsContext';
import { ArticleCard } from '../components/ArticleCard';
import { Loader } from '../components/Loader';


export const Home: React.FC = () => {
  const { articles, filters, fetchArticles, page, loading,setFilters } = useNewsStore();

  // Fetch articles whenever filters or page changes
  useEffect(() => {
    
    fetchArticles(false); // Fetch articles without preferences
  }, [filters, page, fetchArticles]);

  return (
    <div className="bg-gray-100 min-h-screen">
      {loading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-4 sm:px-6 lg:px-8 py-8">
          {articles.map((article, index) => (
            <ArticleCard key={index} {...article} />
          ))}
        </div>
      )}

     
    </div>
  );
};
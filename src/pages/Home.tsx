import React, { useEffect } from 'react';
import { useNewsStore } from '../context/NewsContext';
import { ArticleCard } from '../components/ArticleCard';
import { Loader } from '../components/Loader';


export const Home: React.FC = () => {
  const { articles, filters,fetchArticles, page, loading } = useNewsStore();

  console.log('filters',filters)

  // Fetch articles whenever filters or page changes
  useEffect(() => {
   
   
    fetchArticles(false); // Fetch articles without preferences

    // 
  }, [filters, page, fetchArticles]);

  return (
    <div className="bg-gray-100 min-h-screen">
      {loading ? (
        <Loader />
      ) : (
       
            <ArticleCard  articles={articles} />
       
       
      )}

     
    </div>
  );
};
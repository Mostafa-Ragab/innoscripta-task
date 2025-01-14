import React, { useEffect } from 'react';
import { useNewsStore } from '../context/NewsContext';
import { ArticleCard } from '../components/ArticleCard';
import { Loader } from '../components/Loader';

const NewsFeed: React.FC = () => {
  const { articles, fetchArticles, loading,preferences } = useNewsStore();

  useEffect(() => {
    fetchArticles(true); // Fetch articles on mount
  }, [fetchArticles,preferences]);

  return (
    <div className="container mx-auto p-4">
      {loading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article, index) => (
            <ArticleCard key={index} {...article} />
          ))}
        </div>
      )}
    </div>
  );
};

export default NewsFeed
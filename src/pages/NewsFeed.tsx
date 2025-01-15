import React, { useEffect } from 'react';
import { useNewsStore } from '../store/NewsStore';
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
       
            <ArticleCard  articles={articles} />
     
      )}
    </div>
  );
};

export default NewsFeed
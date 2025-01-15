import React, { useEffect } from 'react';
import { useNewsStore } from '../store/NewsStore';
import { ArticleCard } from '../components/ArticleCard';
import { Loader } from '../components/Loader';

const NewsFeed: React.FC = () => {
  const { articles, fetchArticles, loading, preferences } = useNewsStore();

  useEffect(() => {
    fetchArticles(true); // Fetch articles with preferences on mount
  }, [fetchArticles, preferences]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-6">
        {/* Introductory Text */}
        <header className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
            Welcome to Your Personalized News Feed
          </h1>
          <p className="text-lg text-gray-600">
            Stay updated with the latest articles tailored to your preferences. Explore trending topics, favorite categories, and more!
          </p>
        </header>

        {/* Loader or Articles */}
        {loading ? (
          <Loader />
        ) : articles.length > 0 ? (
          <ArticleCard articles={articles} />
        ) : (
          <div className="flex flex-col items-center justify-center h-96 text-center">
            <h2 className="text-3xl font-extrabold text-gray-800 mb-4">
              No Articles Found
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Adjust your preferences to discover more news.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsFeed;
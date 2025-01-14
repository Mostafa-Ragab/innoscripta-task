import React, { useEffect, useState } from 'react';
import { usePreferencesStore } from '../context/preferencesStore'
import { fetchAllArticles } from '../api/fetchNews';

const NewsFeed: React.FC = () => {
  const { sources, categories, authors } = usePreferencesStore();
  const [articles, setArticles] = useState<any[]>([]);

  useEffect(() => {
    const fetchArticles = async () => {
      const personalizedArticles = await fetchAllArticles({
        sources,
        categories,
        authors,
        page: 1,
      });
      setArticles(personalizedArticles);
    };

    fetchArticles();
  }, [sources, categories, authors]);
console.log('articles', articles,'sources, categories, authors',sources, categories, authors)
  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-lg font-semibold mb-4">Your Personalized News Feed</h2>
      {articles.length > 0 ? (
        articles.map((article, index) => (
          <div key={index} className="mb-4">
            <h3 className="text-md font-bold">{article.title}</h3>
            <p>{article.description}</p>
          </div>
        ))
      ) : (
        <p>No articles found based on your preferences.</p>
      )}
    </div>
  );
};

export default NewsFeed;
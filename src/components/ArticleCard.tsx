import React from 'react';
import noData from '../assets/no-data.png';
import noImage from '../assets/No-Image-Placeholder.svg';
import { Article } from '../types/news';

interface ArticleCardProps {
  articles: Article[];
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ articles }) => {
  if (articles.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-96 text-center">
        <img
          src={noData}
          alt="No Articles Found"
          className="mb-6 w-72 h-72 object-contain"
        />
        <h2 className="text-2xl font-bold text-gray-800 mb-4">No Articles Found</h2>
        <p className="text-gray-600 mb-6">
          We couldn't find any articles. Please try adjusting your filters or check back later.
        </p>
        <button
          className="px-6 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition"
          onClick={() => window.location.reload()}
        >
          Refresh
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {articles.map((article, index) => (
        <div
          key={index}
          className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-2"
        >
          {/* Image Section */}
          <a href={article.url} target="_blank" rel="noopener noreferrer" className="block">
            <div className="relative h-52 w-full">
              <img
                src={article.urlToImage || noImage}
                alt={article.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <span className="absolute top-2 right-2 bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                {article.source}
              </span>
            </div>
          </a>

          {/* Content Section */}
          <div className="p-5">
            {/* Title */}
            <h2 className="text-lg font-bold text-gray-800 mb-3 leading-snug line-clamp-2">
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-red-600 transition"
              >
                {article.title}
              </a>
            </h2>

            {/* Description */}
            <p className="text-sm text-gray-700 mb-5 line-clamp-3">
              {article.description || 'No description available.'}
            </p>

            {/* Footer */}
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-600 font-medium hover:underline"
              >
                Read More
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
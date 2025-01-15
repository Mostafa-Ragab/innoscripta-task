import React from 'react';
import noData from '../assets/no-data.png'
import noImage from '../assets/no-image.png'
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
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">No Articles Found</h2>
        <p className="text-gray-600 mb-6">
          We couldn't find any articles. Please try adjusting your filters or check back later.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {articles.map((article, index) => (
        <div
          key={index}
          className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1"
        >
          {/* Image Section */}
          <a href={article.url} target="_blank" rel="noopener noreferrer" className="block">
            <div className="relative">
              <img
                src={article.urlToImage || noImage}
                alt={article.title}
                className="w-full h-48 object-cover"
              />
              <span className="absolute top-2 right-2 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                {article.source}
              </span>
            </div>
          </a>

          {/* Content Section */}
          <div className="p-4">
            {/* Title */}
            <h2 className="text-lg font-bold text-gray-900 mb-2 leading-tight line-clamp-2">
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-600"
              >
                {article.title}
              </a>
            </h2>

            {/* Description */}
            <p className="text-sm text-gray-700 mb-4 line-clamp-3">
              {article.description || 'No description available.'}
            </p>

            {/* Footer */}
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span className="italic">{new Date(article.publishedAt).toLocaleDateString()}</span>
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 font-medium hover:underline"
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
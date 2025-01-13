// src/components/ArticleCard.tsx
import React from 'react';

interface ArticleCardProps {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  source: string;
  publishedAt: string;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  title,
  description,
  url,
  urlToImage,
  source,
  publishedAt,
}) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <img
        src={urlToImage || 'https://via.placeholder.com/400x200?text=No+Image'}
        alt={title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-lg font-bold mb-2">
          <a href={url} target="_blank" rel="noopener noreferrer" className="hover:underline">
            {title}
          </a>
        </h2>
        <p className="text-sm text-gray-600 mb-4">{description || 'No description available.'}</p>
        <div className="text-xs text-gray-500">
          <span>{source}</span> · <span>{new Date(publishedAt).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
};
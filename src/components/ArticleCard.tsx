// src/components/ArticleCard.tsx
import React from 'react';

interface ArticleCardProps {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  source: { name: string };
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ title, description, url, urlToImage, source }) => (
  <div className="bg-white shadow-md rounded-lg overflow-hidden">
    <img src={urlToImage} alt={title} className="w-full h-40 object-cover" />
    <div className="p-4">
      <h2 className="text-lg font-bold text-gray-800">{title}</h2>
      <p className="text-gray-600 mt-2 line-clamp-3">{description}</p>
      <span className="text-sm text-gray-500 mt-2 block">{source.name}</span>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="block mt-4 text-primary font-semibold hover:underline"
      >
        Read More
      </a>
    </div>
  </div>
);
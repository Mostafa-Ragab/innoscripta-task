// src/pages/Preferences.tsx
import React, { useState } from 'react';
import { useNewsStore } from '../context/NewsContext';

const categories = ['general', 'business', 'technology', 'sports', 'entertainment', 'science', 'health'];
const sources = ['BBC News', 'The Guardian', 'NY Times', 'NewsAPI'];
const authors = ['John Doe', 'Jane Smith', 'Mike Johnson']; // Example authors

export const Preferences: React.FC = () => {
  const { preferences, savePreferences } = useNewsStore();
  const [favoriteCategories, setFavoriteCategories] = useState(preferences.favoriteCategories);
  const [favoriteSources, setFavoriteSources] = useState(preferences.favoriteSources);
  const [favoriteAuthors, setFavoriteAuthors] = useState(preferences.favoriteAuthors);

  const toggleItem = (item: string, list: string[], setList: React.Dispatch<React.SetStateAction<string[]>>) => {
    setList((prev) => (prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]));
  };

  const handleSave = () => {
    savePreferences({ favoriteCategories, favoriteSources, favoriteAuthors });
    alert('Preferences saved successfully!');
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Customize Your Feed</h1>

      {/* Favorite Categories */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Favorite Categories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {categories.map((category) => (
            <label key={category} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={favoriteCategories.includes(category)}
                onChange={() => toggleItem(category, favoriteCategories, setFavoriteCategories)}
                className="form-checkbox text-blue-500"
              />
              <span className="text-gray-700">{category}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Favorite Sources */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Favorite Sources</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {sources.map((source) => (
            <label key={source} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={favoriteSources.includes(source)}
                onChange={() => toggleItem(source, favoriteSources, setFavoriteSources)}
                className="form-checkbox text-blue-500"
              />
              <span className="text-gray-700">{source}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Favorite Authors */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Favorite Authors</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {authors.map((author) => (
            <label key={author} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={favoriteAuthors.includes(author)}
                onChange={() => toggleItem(author, favoriteAuthors, setFavoriteAuthors)}
                className="form-checkbox text-blue-500"
              />
              <span className="text-gray-700">{author}</span>
            </label>
          ))}
        </div>
      </div>

      <button
        onClick={handleSave}
        className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
      >
        Save Preferences
      </button>
    </div>
  );
};
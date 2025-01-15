import React, { useState, useEffect } from 'react';
import { useNewsStore } from '../store/NewsStore';
import { useNavigate } from 'react-router-dom';
import { Option } from '../types/news';

const Preferences: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const {
    savePreferences,
    preferences,
    guardianCategories,
    newsApiCategories,
    nyTimesCategories,
    sources,
  } = useNewsStore();

  const [selectedSource, setSelectedSource] = useState<string>(
    preferences?.favoriteSources[0] || ''
  );
  const [selectedCategory, setSelectedCategory] = useState<string>(
    preferences?.favoriteCategories[0] || ''
  );
  const [selectedAuthor, setSelectedAuthor] = useState<string>(
    preferences?.favoriteAuthors[0] || ''
  );
  const [availableCategories, setAvailableCategories] = useState<Option[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const categoriesBySource: { [key: string]: Option[] } = {
      NewsAPI: newsApiCategories,
      'The Guardian': guardianCategories,
      NYTimes: nyTimesCategories,
    };

    setAvailableCategories(categoriesBySource[selectedSource] || []);

    // Reset selected category if source changes
    if (
      !categoriesBySource[selectedSource]?.some(
        (category) => category.value === selectedCategory
      )
    ) {
      setSelectedCategory('');
    }
  }, [selectedSource, selectedCategory]);

  const handleSavePreferences = () => {
    savePreferences({
      favoriteSources: [selectedSource],
      favoriteCategories: [selectedCategory],
      favoriteAuthors: [selectedAuthor],
    });

    alert('Preferences saved!');
    onClose();
    navigate('/news-feed');
  };

  const isSaveDisabled = !selectedSource || !selectedCategory;

  return (
    <>
      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-500 ease-in-out z-40 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Customize Your News Feed
          </h2>

          {/* Preferred Source */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Preferred Source
            </label>
            <select
              value={selectedSource}
              onChange={(e) => setSelectedSource(e.target.value)}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
            >
              <option value="">Select a source</option>
              {sources.map((source) => (
                <option key={source.value} value={source.value}>
                  {source.label}
                </option>
              ))}
            </select>
          </div>

          {/* Preferred Category */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Preferred Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
              disabled={!selectedSource}
            >
              <option value="">Select a category</option>
              {availableCategories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>

          {/* Preferred Author */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Preferred Author
            </label>
            <input
              type="text"
              value={selectedAuthor}
              onChange={(e) => setSelectedAuthor(e.target.value)}
              placeholder="Enter author's name"
              className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
            />
          </div>

          {/* Save Button */}
          <button
            onClick={handleSavePreferences}
            disabled={isSaveDisabled}
            className={`w-full px-4 py-2 rounded-lg font-medium text-white transition ${
              isSaveDisabled
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-red-600 hover:bg-red-700'
            }`}
          >
            Save Preferences
          </button>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 transition-opacity duration-300"
          onClick={onClose}
        ></div>
      )}
    </>
  );
};

export default Preferences;
import React, { useState, useEffect } from 'react';
import { useNewsStore } from '../context/NewsContext';
import { useNavigate } from 'react-router-dom';
import { guardianInitSections, newsApiCategories } from '../utils/constants';

const Preferences: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const { savePreferences, preferences } = useNewsStore();
  const [selectedSource, setSelectedSource] = useState<string>(preferences.favoriteSources[0] || '');
  const [selectedCategory, setSelectedCategory] = useState<string>(preferences.favoriteCategories[0] || '');
  const [selectedAuthor, setSelectedAuthor] = useState<string>(preferences.favoriteAuthors[0] || '');
  const [availableCategories, setAvailableCategories] = useState<{ value: string; label: string }[]>([]);
  const navigate = useNavigate();

  // Update available categories based on selected source
  useEffect(() => {
    const categoriesBySource: { [key: string]: { value: string; label: string }[] } = {
      NewsAPI: newsApiCategories,
      'The Guardian': guardianInitSections,
    };
    setAvailableCategories(categoriesBySource[selectedSource] || []);
    // Reset selected category if source changes
    if (!categoriesBySource[selectedSource]?.some((category) => category.value === selectedCategory)) {
      setSelectedCategory(''); // Reset category if it's invalid for the selected source
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
    navigate('/news-feed'); // Navigate to the news-feed page
  };

  const isSaveDisabled = !selectedSource || !selectedCategory;

  return (
    <>
      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-40 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-6">Customize Your News Feed</h2>

          {/* Preferred Source */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Preferred Source</label>
            <select
              value={selectedSource}
              onChange={(e) => setSelectedSource(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
            >
              <option value="">Select a source</option>
              <option value="NewsAPI">NewsAPI</option>
              <option value="The Guardian">The Guardian</option>
            </select>
          </div>

          {/* Preferred Category */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Preferred Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
              disabled={!selectedSource} // Disable dropdown if no source is selected
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
            <label className="block text-sm font-medium text-gray-700">Preferred Author</label>
            <input
              type="text"
              value={selectedAuthor}
              onChange={(e) => setSelectedAuthor(e.target.value)}
              placeholder="Enter author's name"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>

          {/* Save Button */}
          <button
            onClick={handleSavePreferences}
            disabled={isSaveDisabled}
            className={`w-full px-4 py-2 rounded-lg transition ${
              isSaveDisabled
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            Save Preferences
          </button>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={onClose}
        ></div>
      )}
    </>
  );
};

export default Preferences;
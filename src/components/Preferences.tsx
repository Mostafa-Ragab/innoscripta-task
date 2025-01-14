import React, { useState } from 'react';
import { usePreferencesStore } from '../context/preferencesStore';
import { useNavigate } from 'react-router-dom';

const Preferences: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const { sources, categories, authors, setSources, setCategories, setAuthors } =
    usePreferencesStore();
  const [selectedSource, setSelectedSource] = useState<string>(sources[0] || '');
  const [selectedCategory, setSelectedCategory] = useState<string>(categories[0] || '');
  const [selectedAuthor, setSelectedAuthor] = useState<string>(authors[0] || '');
  const navigate = useNavigate(); // Initialize navigate function

  const savePreferences = () => {
    setSources([selectedSource]);
    setCategories([selectedCategory]);
    setAuthors([selectedAuthor]);
    alert('Preferences saved!');

    onClose(); // Close the sidebar
    navigate('/news-feed'); // Navigate to the news-feed page
  };

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

          {/* Sources */}
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

          {/* Categories */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Preferred Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
            >
              <option value="">Select a category</option>
              <option value="business">Business</option>
              <option value="technology">Technology</option>
              <option value="sports">Sports</option>
              <option value="health">Health</option>
              <option value="science">Science</option>
            </select>
          </div>

          {/* Author */}
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
            onClick={savePreferences}
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
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
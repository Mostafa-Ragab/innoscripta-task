import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { useNewsStore } from '../store/NewsStore';
import 'react-datepicker/dist/react-datepicker.css';
import { Option } from '../types/news';

export const Filters: React.FC = () => {
  const {
    setFilters,
    resetFilters,
    fetchArticles,
    guardianCategories,
    newsApiCategories,
    nyTimesCategories,
    sources,
  } = useNewsStore();

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [source, setSource] = useState('');
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const [categoriesList, setCategoriesList] = useState<Option[]>([]);

  // Update categories list dynamically based on selected source
  useEffect(() => {
    const categoriesBySource: { [key: string]: Option[] } = {
      'The Guardian': guardianCategories,
      NewsAPI: newsApiCategories,
      NYTimes: nyTimesCategories,
    };

    setCategoriesList(categoriesBySource[source] || []);

    // Reset category if the selected source changes and the category is invalid
    if (!categoriesBySource[source]?.some((cat) => cat.value === category)) {
      setCategory('');
    }
  }, [source, category, guardianCategories, newsApiCategories, nyTimesCategories]);

  const applyFilters = () => {
    const formattedStartDate = dateRange[0] ? dateRange[0].toISOString().split('T')[0] : '';
    const formattedEndDate = dateRange[1] ? dateRange[1].toISOString().split('T')[0] : '';

    setFilters({
      search,
      categories: category ? [category] : [],
      startDate: formattedStartDate,
      endDate: formattedEndDate,
      sources: source ? [source] : [],
    });
    fetchArticles();
  };

  const clearFilters = () => {
    setSearch('');
    setCategory('');
    setSource('');
    setDateRange([null, null]);
    resetFilters();
    fetchArticles();
  };

  return (
    <div className="bg-white shadow-xl rounded-lg p-6 mb-8 animate-fade-in">
      {/* Filter Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Search Input */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search articles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <span className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400">
            🔍
          </span>
        </div>

        {/* Source Dropdown */}
        <div>
          <select
            value={source}
            onChange={(e) => setSource(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="">All Sources</option>
            {sources.map((src) => (
              <option key={src.value} value={src.value}>
                {src.label}
              </option>
            ))}
          </select>
        </div>

        {/* Category Dropdown */}
        <div>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={`w-full p-3 border rounded-lg focus:outline-none ${
              !source
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'border-gray-300 focus:ring-2 focus:ring-red-500'
            }`}
            disabled={!source}
          >
            <option value="">Select a category</option>
            {categoriesList.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        {/* Date Range Picker */}
        <div>
          <DatePicker
            selected={dateRange[0]}
            onChange={(update: [Date | null, Date | null]) => {
              setDateRange(update);
            }}
            startDate={dateRange[0]}
            endDate={dateRange[1]}
            selectsRange
            isClearable
            placeholderText="Select a date range"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-end items-center gap-4 mt-8">
        {/* Clear Button */}
        <button
          onClick={clearFilters}
          className="px-6 py-3 bg-gray-200 text-gray-800 font-medium rounded-lg hover:bg-gray-300 transition duration-300"
        >
          Clear
        </button>

        {/* Apply Button */}
        <button
          onClick={applyFilters}
          className="px-6 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition duration-300"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};
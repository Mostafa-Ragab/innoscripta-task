import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { useNewsStore } from '../store/NewsStore';
import 'react-datepicker/dist/react-datepicker.css';
import { Option } from '../types/news';

export const Filters: React.FC = () => {
  const { setFilters, resetFilters,fetchArticles, guardianCategories, newsApiCategories, nyTimesCategories, sources } = useNewsStore();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [source, setSource] = useState('');
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([new Date(), new Date()]);
  const [categoriesList, setCategoriesList] = useState<Option[]>([]);

  // Update categories list dynamically based on selected source
  useEffect(() => {
    const categoriesBySource: { [key: string]: { label: string; value: string }[] } = {
      'The Guardian': guardianCategories,
      NewsAPI: newsApiCategories,
      NYTimes: nyTimesCategories,
    };

    setCategoriesList(categoriesBySource[source] || []);
    if (!categoriesBySource[source]?.some((cat) => cat.value === category)) {
      setCategory(''); // Reset category if the selected source changes and the category is invalid
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
    resetFilters()
    fetchArticles();
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search articles..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Source Dropdown */}
        <select
          value={source}
          onChange={(e) => setSource(e.target.value)}
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Sources</option>
          {sources.map((src) => (
            <option key={src.value} value={src.value}>
              {src.label}
            </option>
          ))}
        </select>

        {/* Category Dropdown */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={!source} // Disable if no source is selected
        >
          <option value="">Select a category</option>
          {categoriesList.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>

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
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
          />
        </div>
      </div>

      <div className="flex justify-end items-center gap-4 mt-6">
        {/* Clear Button */}
        <button
          onClick={clearFilters}
          className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
        >
          Clear
        </button>

        {/* Apply Button */}
        <button
          onClick={applyFilters}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};
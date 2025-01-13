// src/components/Filters.tsx
import React, { useState } from 'react';
import { useNewsContext } from '../context/NewsContext';

export const Filters: React.FC = () => {
  const { setFilters, fetchArticles } = useNewsContext();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('general');
  const [source, setSource] = useState('');
  const [date, setDate] = useState('');

  const applyFilters = () => {
    setFilters({
      search,
      categories: [category],
      date,
      sources: source ? [source] : [],
    });
    fetchArticles();
  };

  const clearFilters = () => {
    setSearch('');
    setCategory('general');
    setSource('');
    setDate('');
    setFilters({
      search: '',
      categories: ['general'],
      date: '',
      sources: [],
    });
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

        {/* Category Dropdown */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="general">General</option>
          <option value="business">Business</option>
          <option value="technology">Technology</option>
          <option value="sports">Sports</option>
          <option value="entertainment">Entertainment</option>
          <option value="science">Science</option>
          <option value="health">Health</option>
        </select>

        {/* Source Dropdown */}
        <select
          value={source}
          onChange={(e) => setSource(e.target.value)}
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Sources</option>
          <option value="The Guardian">The Guardian</option>
          <option value="NewsAPI">NewsAPI</option>
        </select>

        {/* Date Picker */}
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
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
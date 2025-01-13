import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { useNewsStore } from '../context/NewsContext';
import 'react-datepicker/dist/react-datepicker.css';

export const Filters: React.FC = () => {
  const { setFilters, fetchArticles, guardianCategories, newsApiCategories } = useNewsStore();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('general');
  const [source, setSource] = useState('');
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([new Date(), new Date()]);

  const categoriesList = source === 'The Guardian' ? guardianCategories : newsApiCategories;

  const applyFilters = () => {
    const formattedStartDate = dateRange[0] ? dateRange[0].toISOString().split('T')[0] : '';
    const formattedEndDate = dateRange[1] ? dateRange[1].toISOString().split('T')[0] : '';

    setFilters({
      search,
      categories: [category],
      startDate: formattedStartDate,
      endDate:formattedEndDate,
      sources: source ? [source] : [],
    });
    fetchArticles();
  };

  const clearFilters = () => {
    setSearch('');
    setCategory('');
    setSource('');
    setDateRange([new Date(), new Date()]);
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
          {categoriesList.map((cat: { label: string; value: string }) => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
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
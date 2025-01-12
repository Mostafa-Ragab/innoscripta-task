// src/components/Filters.tsx
import React, { useState } from 'react';

interface FiltersProps {
  onSearch: (query: string) => void;
  onFilterChange: (filters: { category: string; source: string; date: string }) => void;
}

export const Filters: React.FC<FiltersProps> = ({ onSearch, onFilterChange }) => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const [source, setSource] = useState('');
  const [date, setDate] = useState('');

  const handleSearch = () => {
    onSearch(query);
    onFilterChange({ category, source, date });
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      <div className="flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Search articles..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="p-3 border border-gray-300 rounded-md w-full md:w-1/4"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-3 border border-gray-300 rounded-md w-full md:w-1/4"
        >
          <option value="">All Categories</option>
          <option value="technology">Technology</option>
          <option value="business">Business</option>
        </select>
        <select
          value={source}
          onChange={(e) => setSource(e.target.value)}
          className="p-3 border border-gray-300 rounded-md w-full md:w-1/4"
        >
          <option value="">All Sources</option>
          <option value="bbc-news">BBC News</option>
          <option value="the-verge">The Verge</option>
        </select>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="p-3 border border-gray-300 rounded-md w-full md:w-1/4"
        />
        <button
          onClick={handleSearch}
          className="bg-primary text-white px-6 py-3 rounded-md hover:bg-accent transition w-full md:w-auto"
        >
          Search
        </button>
      </div>
    </div>
  );
};
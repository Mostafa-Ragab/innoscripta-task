// src/components/Pagination.tsx
import React from 'react';
import { useNewsContext } from '../context/NewsContext';

export const Pagination: React.FC = () => {
  const { page, setPage, totalResults } = useNewsContext();

  const pageSize = 10; // Fixed number of articles per page
  const totalPages = Math.ceil(totalResults / pageSize);

  const handlePrev = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  return (
    <div className="flex justify-between items-center mt-6">
      <button
        onClick={handlePrev}
        disabled={page === 1}
        className={`px-4 py-2 rounded ${page === 1 ? 'bg-gray-300' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
      >
        Previous
      </button>
      <span className="text-gray-700">
        Page {page} of {totalPages}
      </span>
      <button
        onClick={handleNext}
        disabled={page === totalPages}
        className={`px-4 py-2 rounded ${
          page === totalPages ? 'bg-gray-300' : 'bg-blue-500 text-white hover:bg-blue-600'
        }`}
      >
        Next
      </button>
    </div>
  );
};
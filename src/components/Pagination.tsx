import React from 'react';
import { useNewsStore } from '../store/NewsStore';

export const Pagination: React.FC = () => {
  const { page, setPage, totalResults } = useNewsStore();

  const pageSize = 10; // Fixed number of articles per page
  const totalPages = Math.min(Math.ceil(totalResults / pageSize), 15); // Limit to 15 pages max

  const handlePrev = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handlePageSelect = (selectedPage: number) => {
    if (selectedPage !== page) setPage(selectedPage);
  };

  const generatePageNumbers = () => {
    const range = [];
    const maxVisiblePages = 5; // Maximum visible pages
    const start = Math.max(1, page - Math.floor(maxVisiblePages / 2));
    const end = Math.min(totalPages, start + maxVisiblePages - 1);

    for (let i = start; i <= end; i++) {
      range.push(i);
    }
    return range;
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between mt-8">
      {/* Previous Button */}
      <button
        onClick={handlePrev}
        disabled={page === 1}
        className={`px-4 py-2 rounded-lg shadow-md transition ${
          page === 1
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-red-500 text-white hover:bg-red-600'
        }`}
      >
        Previous
      </button>

      {/* Page Numbers */}
      <div className="flex items-center space-x-2 my-4 sm:my-0">
        {page > 3 && (
          <>
            <button
              onClick={() => handlePageSelect(1)}
              className="px-3 py-1 rounded-lg bg-gray-200 text-gray-700 hover:bg-red-300 transition"
            >
              1
            </button>
            <span className="text-gray-500">...</span>
          </>
        )}
        {generatePageNumbers().map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => handlePageSelect(pageNumber)}
            className={`px-3 py-1 rounded-lg shadow-md transition ${
              pageNumber === page
                ? 'bg-red-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-red-300'
            }`}
          >
            {pageNumber}
          </button>
        ))}
        {page < totalPages - 2 && (
          <>
            <span className="text-gray-500">...</span>
            <button
              onClick={() => handlePageSelect(totalPages)}
              className="px-3 py-1 rounded-lg bg-gray-200 text-gray-700 hover:bg-red-300 transition"
            >
              {totalPages}
            </button>
          </>
        )}
      </div>

      {/* Next Button */}
      <button
        onClick={handleNext}
        disabled={page === totalPages}
        className={`px-4 py-2 rounded-lg shadow-md transition ${
          page === totalPages
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-red-500 text-white hover:bg-red-600'
        }`}
      >
        Next
      </button>
    </div>
  );
};
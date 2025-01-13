// src/utils/queryBuilder.ts
import { NewsFilters } from '../types/filters';

export const buildQuery = (filters: NewsFilters): string => {
  return [
    filters.search || 'news', // Default to "news" if no search query is provided
    filters.categories[0] !== 'general' ? filters.categories[0] : '', // Add category if not "general"
  ]
    .filter(Boolean) // Remove empty or undefined values
    .join(' '); // Join with spaces
};
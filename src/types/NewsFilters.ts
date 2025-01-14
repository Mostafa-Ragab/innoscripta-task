// src/types/filters.d.ts
export type NewsCategory =
  | 'general'
  | 'technology'
  | 'business'
  | 'health'
  | 'science'
  | 'sports'
  | 'entertainment';

  export type NewsSource =
  | 'The Guardian'
  | 'BBC News'
  | 'NYTimes'
  | 'NewsAPI'
  | 'NewsCred';

  export interface NewsFilters {
    search: string; // Search query
    categories: NewsCategory[]; // Typed categories
    startDate: string,
  endDate:string,
    sources: NewsSource[]; // Typed sources
    page: number; // Page number for pagination
    authors:[];
  }
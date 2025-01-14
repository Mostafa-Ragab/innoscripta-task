

  export interface NewsFilters {
    search: string; // Search query
    categories: string[]; // Typed categories
    startDate: string,
  endDate:string,
    sources: string[]; // Typed sources
    page: number; // Page number for pagination
    authors:string[];
  }
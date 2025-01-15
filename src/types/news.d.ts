export interface NewsPreferences {
  favoriteCategories: string[]; 
  favoriteSources: string[];    
  favoriteAuthors: string[];    // Array of preferred authors like ['John Doe', 'Jane Smith']
}

  export interface NewsFilters {
    search: string; // Search query
    categories: string[]; // Typed categories
    startDate: string,
  endDate:string,
    sources: string[]; // Typed sources
    page?: number; // Page number for pagination
    authors?:string[] | undefined;
  }

  export interface Article {
    title: string;          // Title of the news article
    description: string;    // Short description or excerpt
    url: string;            // URL to the full article
    urlToImage: string;          // URL to the article's featured image
    publishedAt: string;    // Publication date (ISO format string)
    source: string;         // News source (e.g., "BBC News")
  }

  export interface Option {
    value: string;
    label: string;
  }
  
  interface NewsPreferences {
    favoriteCategories: string[];
    favoriteSources: string[];
    favoriteAuthors: string[] 
  }
  
  interface NewsState {
    articles: Article[];
    filters: NewsFilters;
    preferences: NewsPreferences ;
    guardianCategories: Option[];
    newsApiCategories: Option[];
    nyTimesCategories: Option[];
    loading: boolean;
    page: number;
    totalResults: number;
    sources: Option[];
    setFilters: (filters: NewsFilters) => void;
    fetchArticles: (applyPreferences?: boolean, page?: number) => Promise<void>;
    savePreferences: (preferences: NewsPreferences) => void;
    setPage: (page: number) => void;
    resetFilters: () => void;
   
  }
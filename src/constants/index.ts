import { Option } from "../types/news";

export const newsApiCategoriesList: Option[] = [
    { value: 'general', label: 'General' },
    { value: 'business', label: 'Business' },
    { value: 'entertainment', label: 'Entertainment' },
    { value: 'health', label: 'Health' },
    { value: 'science', label: 'Science' },
    { value: 'sports', label: 'Sports' },
    { value: 'technology', label: 'Technology' },
  ];
  
  export const nyTimesSectionsList: Option[] = [
    { label: 'Arts', value: 'Arts' },
    { label: 'Automobiles', value: 'Automobiles' },
    { label: 'Autos', value: 'Autos' },
    { label: 'Blogs', value: 'Blogs' },
    { label: 'Books', value: 'Books' },
    { label: 'Booming', value: 'Booming' },
    { label: 'Business', value: 'Business' },
    { label: 'Business Day', value: 'Business Day' },
    { label: 'Corrections', value: 'Corrections' },
    { label: 'Crosswords & Games', value: 'Crosswords & Games' },
    { label: 'Crosswords/Games', value: 'Crosswords/Games' },
    { label: 'Health', value: 'Health' },
    { label: 'Home & Garden', value: 'Home & Garden' },
    { label: 'Home and Garden', value: 'Home and Garden' },
    { label: 'International Home', value: 'International Home' },
    { label: 'Job Market', value: 'Job Market' },
    { label: 'Learning', value: 'Learning' },
    { label: 'Magazine', value: 'Magazine' },

    
  ];
  

  
  export const guardianInitSectionsList: Option[] = [
    { value: 'culture', label: 'culture' },
    { value: 'books', label: 'books' },
    { value: 'fashion', label: 'fashion' },
  

   
  ];

  export const sourcesList: Option[] = [
    { value: 'NewsAPI', label: 'NewsAPI' },
    { value: 'The Guardian', label: 'The Guardian' },
    { value: 'NYTimes', label: 'NYTimes' },
  ];
  
  export const AVAILABLE_SOURCES = ['NewsAPI', 'The Guardian', 'NYTimes'];

 export const NEWS_API_URL = 'https://newsapi.org/v2/top-headlines';
export const GUARDIAN_API_URL = 'https://content.guardianapis.com/search';
export const NYT_API_URL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';
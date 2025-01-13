
import axios from 'axios';
import { buildQuery } from '../utils/queryBuilder';
import { NewsFilters } from '../types/NewsFilters';
const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const NEWS_API_URL = import.meta.env.VITE_NEWS_API_URL;
const GUARDIAN_API_KEY = import.meta.env.VITE_GUARDIAN_API_KEY;
const GUARDIAN_API_URL = import.meta.env.VITE_GUARDIAN_API_URL;
const NYT_API_KEY = import.meta.env.VITE_NYT_API_KEY;
const NYT_API_URL = import.meta.env.VITE_NYT_API_URL;




// // Fetch from NYTimes
// const fetchFromNYTimesAPI = async (query: string) => {
//   const response = await axios.get(NYT_API_URL, {
//     params: {
//       q: query,
//       'api-key': NYT_API_KEY,
//     },
//   });
//   return response.data.response.docs.map((doc: any) => ({
//     title: doc.headline.main,
//     description: doc.abstract,
//     url: doc.web_url,
//     urlToImage: doc.multimedia?.[0]?.url ? `https://www.nytimes.com/${doc.multimedia[0].url}` : '',
//     source: 'NYTimes',
//     publishedAt: doc.pub_date,
//   }));
// };


// Utility function to validate and determine which sources to fetch
const validateSources = (sources: string[] = [], availableSources = ['NewsAPI', 'The Guardian']): string[] =>
  sources.length === 0 ? availableSources : sources.filter((source) => availableSources.includes(source));

// Main function to fetch articles
export const fetchAllArticles = async (filters: NewsFilters, page: number = 1) => {
  const sourcesToFetch = validateSources(filters.sources);
  const category = filters.categories[0]; // Extract category from filters

  // Build an array of fetch promises based on sources to fetch
  const fetchPromises = sourcesToFetch.map((source) => {
    if (source === 'NewsAPI') {
      return fetchFromNewsAPI(filters.search, filters.startDate, filters.endDate, page, category);
    }
    if (source === 'The Guardian') {
      return fetchFromGuardianAPI(filters.search, filters.startDate, filters.endDate, page, category);
    }
    return Promise.resolve({ articles: [], totalResults: 0 }); // Fallback for unexpected source
  });

  // Use Promise.allSettled to handle both resolved and rejected promises
  const results = await Promise.allSettled(fetchPromises);

  // Process results: Include only fulfilled promises
  const successfulResults = results
    .filter((result): result is PromiseFulfilledResult<{ articles: any[]; totalResults: number }> => result.status === 'fulfilled')
    .map((result) => result.value);

  // Combine articles and calculate total results
  const articles = successfulResults.flatMap((result) => result.articles);
  const totalResults = Math.max(...successfulResults.map((result) => result.totalResults));

  // Log errors for debugging if needed
  results
    .filter((result): result is PromiseRejectedResult => result.status === 'rejected')
    .forEach((error) => console.error('API Error:', error.reason));

  return {
    articles,
    totalResults,
  };
};

const fetchFromNewsAPI = async (query: string, startDate: string,endDate:string, page: number,category:string) => {
   // Use /top-headlines if a category is specified, otherwise fall back to /everything
  const response = await axios.get('https://newsapi.org/v2/top-headlines', {
    params: {
      page, // Current page
      q:  query ? query : 'news', 
      from: startDate || undefined,
      to: endDate || undefined,
      pageSize: 10, // Hardcoded page size
    
      apiKey: NEWS_API_KEY,
      category: category  || undefined,
    },
  });
  return {
    articles: normalizeArticles(response.data.articles, 'NewsAPI'),
    totalResults: response.data.totalResults,
  };
};

const fetchFromGuardianAPI = async (query: string,startDate: string,endDate:string, page: number,category:string) => {
  const response = await axios.get('https://content.guardianapis.com/search', {
    params: {
      q: query,
      'from-date':startDate || undefined,
       'to-date': endDate || undefined,
      pageSize: 10, // Hardcoded page size
      page, // Current page
      'api-key': GUARDIAN_API_KEY, 
      section: category !== 'general' && category || undefined,
    },
  });
  return {
    articles: normalizeArticles(response.data.response.results, 'The Guardian'),
    totalResults: response.data.response.total,
  };
};

const normalizeArticles = (articles: any[], source: string) =>
  articles.map((article: any) => ({
    title: article.title || article.webTitle,
    description: article.description || '',
    url: article.url || article.webUrl,
    urlToImage: article.urlToImage || '',
    source,
    publishedAt: article.publishedAt || article.webPublicationDate,
  }));
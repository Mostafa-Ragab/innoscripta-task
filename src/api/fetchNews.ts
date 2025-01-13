
import axios from 'axios';
import { buildQuery } from '../utils/queryBuilder';
import { NewsFilters } from '../types/NewsFilters';
const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const NEWS_API_URL = import.meta.env.VITE_NEWS_API_URL;
const GUARDIAN_API_KEY = import.meta.env.VITE_GUARDIAN_API_KEY;
const GUARDIAN_API_URL = import.meta.env.VITE_GUARDIAN_API_URL;
const NYT_API_KEY = import.meta.env.VITE_NYT_API_KEY;
const NYT_API_URL = import.meta.env.VITE_NYT_API_URL;


console.log(NEWS_API_KEY,GUARDIAN_API_URL)


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




export const fetchAllArticles = async (filters: NewsFilters, page: number = 1) => {
  const query = buildQuery(filters) || 'news'; // Default query is "news"

  const [newsAPI, guardian] = await Promise.all([
    fetchFromNewsAPI(query, filters.date, page),
    fetchFromGuardianAPI(query, filters.date, page),
  ]);

  const allArticles = [...newsAPI.articles, ...guardian.articles];

  return {
    articles: allArticles,
    totalResults: Math.max(newsAPI.totalResults, guardian.totalResults), // Use the highest total results for pagination
  };
};

const fetchFromNewsAPI = async (query: string, date: string, page: number) => {
  const response = await axios.get('https://newsapi.org/v2/everything', {
    params: {
      q: query,
      from: date || undefined,
      to: date || undefined,
      language: 'en',
      sortBy: 'publishedAt',
      pageSize: 10, // Hardcoded page size
      page, // Current page
      apiKey: NEWS_API_KEY,
    },
  });
  return {
    articles: normalizeArticles(response.data.articles, 'NewsAPI'),
    totalResults: response.data.totalResults,
  };
};

const fetchFromGuardianAPI = async (query: string, date: string, page: number) => {
  const response = await axios.get('https://content.guardianapis.com/search', {
    params: {
      q: query,
      'from-date': date || undefined,
      'to-date': date || undefined,
      pageSize: 10, // Hardcoded page size
      page, // Current page
      'api-key': GUARDIAN_API_KEY,
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
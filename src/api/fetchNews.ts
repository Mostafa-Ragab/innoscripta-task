import axios from 'axios';
import { NewsFilters } from '../types/NewsFilters';

const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const GUARDIAN_API_KEY = import.meta.env.VITE_GUARDIAN_API_KEY;
const NYT_API_KEY = import.meta.env.VITE_NYT_API_KEY;

const NEWS_API_URL = 'https://newsapi.org/v2/top-headlines';
const GUARDIAN_API_URL = 'https://content.guardianapis.com/search';
const NYT_API_URL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';

const AVAILABLE_SOURCES = ['NewsAPI', 'The Guardian', 'NYTimes'];

// Utility function to validate sources
const validateSources = (sources: string[] = []): string[] =>
  sources.length === 0 ? AVAILABLE_SOURCES : sources.filter((source) => AVAILABLE_SOURCES.includes(source));

// Fetch all articles
export const fetchAllArticles = async (filters: NewsFilters, page: number = 1) => {
  const sourcesToFetch = validateSources(filters.sources);
  const { categories, authors, search, startDate, endDate } = filters;
  const category = categories?.[0];
  const author = authors?.[0];

  // Build fetch promises for each source
  const fetchPromises = sourcesToFetch.map((source) => {
    switch (source) {
      case 'NewsAPI':
        return fetchFromNewsAPI(search, startDate, endDate, page, category, author);
      case 'The Guardian':
        return fetchFromGuardianAPI(search, startDate, endDate, page, category, author);
      case 'NYTimes':
        return fetchFromNYTimesAPI(search, startDate, endDate, page, category, author);
      default:
        return Promise.resolve({ articles: [], totalResults: 0 });
    }
  });

  // Handle fetch results
  const results = await Promise.allSettled(fetchPromises);

  const successfulResults = results
    .filter((result): result is PromiseFulfilledResult<{ articles: any[]; totalResults: number }> => result.status === 'fulfilled')
    .map((result) => result.value);

  const articles = successfulResults.flatMap((result) => result.articles);
  const totalResults = successfulResults.reduce((sum, result) => sum + result.totalResults, 0);

  return { articles, totalResults };
};

// Fetch from NewsAPI
const fetchFromNewsAPI = async (
  query: string,
  startDate: string,
  endDate: string,
  page: number,
  category: string,
  author: string | undefined
) => {
  const response = await axios.get(NEWS_API_URL, {
    params: {
      q: query || 'news',
      from: startDate || undefined,
      to: endDate || undefined,
      pageSize: 10,
      page,
      apiKey: NEWS_API_KEY,
      category: category || undefined,
      author: author || undefined,
    },
  });

  return {
    articles: normalizeArticles(response.data.articles, 'NewsAPI'),
    totalResults: response.data.totalResults,
  };
};

// Fetch from The Guardian
const fetchFromGuardianAPI = async (
  query: string,
  startDate: string,
  endDate: string,
  page: number,
  category: string,
  author: string | undefined
) => {
  const response = await axios.get(GUARDIAN_API_URL, {
    params: {
      q: query,
      'from-date': startDate || undefined,
      'to-date': endDate || undefined,
      pageSize: 10,
      page,
      'api-key': GUARDIAN_API_KEY,
      section: category !== 'general' ? category : undefined,
      author: author || undefined,
    },
  });

  return {
    articles: normalizeArticles(response.data.response.results, 'The Guardian'),
    totalResults: response.data.response.total,
  };
};

// Fetch from NYTimes
const fetchFromNYTimesAPI = async (
  query: string,
  startDate: string,
  endDate: string,
  page: number,
  category: string | undefined,
  author: string | undefined
) => {
  const filterQueries: string[] = [];
  if (author) filterQueries.push(`byline:("${author}")`);
  if (category) filterQueries.push(`section_name:("${category}")`);
  if (query) filterQueries.push(`body:("${query}")`);

  const response = await axios.get(NYT_API_URL, {
    params: {
      q: query || 'news',
      'begin_date': startDate ? startDate.replace(/-/g, '') : undefined,
      'end_date': endDate ? endDate.replace(/-/g, '') : undefined,
      fq: filterQueries.length > 0 ? filterQueries.join(' AND ') : undefined,
      page,
      'api-key': NYT_API_KEY,
    },
  });

  const articles = response.data.response.docs.map((doc: any) => ({
    title: doc.headline.main,
    description: doc.abstract,
    url: doc.web_url,
    urlToImage: doc.multimedia?.[0]?.url
      ? `https://www.nytimes.com/${doc.multimedia[0].url}`
      : '',
    source: 'NYTimes',
    publishedAt: doc.pub_date,
  }));

  return {
    articles: normalizeArticles(articles, 'NYTimes'),
    totalResults: response.data.response.meta.hits,
  };
};

// Normalize articles
const normalizeArticles = (articles: any[], source: string) =>
  articles.map((article: any) => ({
    title: article.title || article.webTitle,
    description: article.description || '',
    url: article.url || article.webUrl,
    urlToImage: article.urlToImage || '',
    source,
    publishedAt: article.publishedAt || article.webPublicationDate,
  }));
import axios from 'axios';
import { Article } from '../types/articles';

const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const GUARDIAN_API_KEY = import.meta.env.VITE_GUARDIAN_API_KEY;
const NYT_API_KEY = import.meta.env.VITE_NYT_API_KEY;

interface ApiResponse {
  articles: Article[];
}

export const fetchArticles = async (keyword: string, category: string, source: string): Promise<Article[]> => {
  const response = await axios.get<ApiResponse>('https://newsapi.org/v2/top-headlines', {
    params: {
      apiKey: NEWS_API_KEY,
      q: keyword,
      category,
      sources: source,
    },
  });
  return response.data.articles;
};
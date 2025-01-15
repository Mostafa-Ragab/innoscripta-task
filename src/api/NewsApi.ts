import axios from 'axios';
import { NEWS_API_URL  } from '../constants';
import { normalizeArticles } from '../utils';

const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY;

// Fetch from NewsAPI
export const fetchFromNewsAPI = async (
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
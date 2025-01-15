import axios from 'axios';
import { GUARDIAN_API_URL } from '../constants';
import { normalizeArticles } from '../utils/helpers';

const GUARDIAN_API_KEY = import.meta.env.VITE_GUARDIAN_API_KEY;

// Fetch from The Guardian
export const fetchFromGuardianAPI = async (
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
import axios from 'axios';
import {  NYT_API_URL  } from '../constants';
import { normalizeArticles } from '../utils';

const NYT_API_KEY = import.meta.env.VITE_NYT_API_KEY;



// Fetch from NYTimes
export const fetchFromNYTimesAPI = async (
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


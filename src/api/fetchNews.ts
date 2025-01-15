import { Article, NewsFilters } from '../types/news';
import { validateSources } from '../utils/helpers';
import { fetchFromNewsAPI } from './NewsApi';
import { fetchFromGuardianAPI } from './GuardianApi';
import { fetchFromNYTimesAPI } from './NYTimesApi';

/**
 * Fetch articles from a specific source.
 * @param source - The source to fetch articles from.
 * @param filters - The filters to apply.
 * @param page - The page number for pagination.
 * @returns A promise with articles and total results.
 */
const fetchArticlesBySource = async (
  source: string,
  filters: NewsFilters,
  page: number
): Promise<{ articles: Article[]; totalResults: number }> => {
  const { search, startDate, endDate, categories, authors } = filters;
  const category = categories?.[0];
  const author = authors?.[0];

  switch (source) {
    case 'NewsAPI':
      return fetchFromNewsAPI(search, startDate, endDate, page, category, author);
    case 'The Guardian':
      return fetchFromGuardianAPI(search, startDate, endDate, page, category, author);
    case 'NYTimes':
      return fetchFromNYTimesAPI(search, startDate, endDate, page, category, author);
    default:
      return { articles: [], totalResults: 0 };
  }
};

/**
 * Aggregate articles from multiple sources based on filters.
 * @param filters - The filters to apply.
 */
export const fetchAllArticles = async (
  filters: NewsFilters,
  page: number = 1
): Promise<{ articles: Article[]; totalResults: number }> => {
  const sourcesToFetch = validateSources(filters.sources);

  // Fetch articles from all validated sources
  const fetchPromises = sourcesToFetch.map((source) =>
    fetchArticlesBySource(source, filters, page)
  );

  const results = await Promise.allSettled(fetchPromises);

  // Process successful results
  const successfulResults = results
    .filter((result): result is PromiseFulfilledResult<{ articles: Article[]; totalResults: number }> => result.status === 'fulfilled')
    .map((result) => result.value);

  // Aggregate articles and total results
  const articles = successfulResults.flatMap((result) => result.articles);
  const totalResults = successfulResults.reduce((sum, result) => sum + result.totalResults, 0);

  return { articles, totalResults };
};
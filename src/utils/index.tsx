import { AVAILABLE_SOURCES } from "../constants";
import { Article } from "../types/news";

// Utility function to validate sources
export const validateSources = (sources: string[] = []): string[] =>
    sources.length === 0 ? AVAILABLE_SOURCES : sources.filter((source) => AVAILABLE_SOURCES.includes(source));



// Normalize articles
export const normalizeArticles = (articles: Article[], source: string) =>
    articles.map((article: any) => ({
      title: article.title || article.webTitle,
      description: article.description || '',
      url: article.url || article.webUrl,
      urlToImage: article.urlToImage || '',
      source,
      publishedAt: article.publishedAt || article.webPublicationDate,
    }));
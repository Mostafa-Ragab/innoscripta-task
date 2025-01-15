import React, { useEffect } from "react";
import { useNewsStore } from "../store/NewsStore";
import { ArticleCard } from "../components/ArticleCard";
import { Loader } from "../components/Loader";
import { Filters } from "../components/Filters";

export const Home: React.FC = () => {
  const { articles, filters, fetchArticles, page, loading } = useNewsStore();
  // Fetch articles whenever filters or page changes
  useEffect(() => {
    fetchArticles();
  }, [filters, page, fetchArticles]);

  return (
    <div>
      <Filters />
      <div className="bg-gray-100 min-h-screen">
        {loading ? <Loader /> : <ArticleCard articles={articles} />}
      </div>
    </div>
  );
};

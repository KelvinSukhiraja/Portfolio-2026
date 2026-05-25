import { useEffect, useState } from "react";
import {
  fetchPortfolioContent,
  type PortfolioContent,
} from "../lib/sanity/fetchPortfolio";

export function usePortfolioContent() {
  const [content, setContent] = useState<PortfolioContent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    fetchPortfolioContent().then((data) => {
      if (!cancelled) {
        setContent(data);
        setLoading(false);
      }
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return { content, loading };
}

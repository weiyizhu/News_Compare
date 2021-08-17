interface NewsResponseProps {
  articles: NewsArticle[];
  status: "ok" | "error";
  totalResults: number;
  code?: string | null;
  message?: string | null;
}

interface NewsArticle {
  author?: string | null;
  content?: string | null;
  description: string;
  publishedAt: string;
  source: { id: string; name: string };
  title: string;
  url: string;
  urlToImage: string;
}

interface NewsResponseProps {
  articles: NewsArticle[];
  status: "ok" | "error";
  totalResults: number;
  code?: string | null;
  message?: string | null;
}

type sourceWithPage = {
  source: string;
  page: number;
};

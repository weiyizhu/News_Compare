export interface NewsResponseProps {
  articles: NewsArticle[];
  status: "ok" | "error";
  totalResults: number;
  code?: string | null;
  message?: string | null;
}

export interface NewsArticle {
  author?: string | null;
  content?: string | null;
  description?: string;
  publishedAt?: string;
  source?: { id: string; name: string };
  title?: string;
  url?: string;
  urlToImage?: string;
}

export interface NewsResponseProps {
  articles: NewsArticle[];
  status: "ok" | "error";
  totalResults: number;
  code?: string | null;
  message?: string | null;
}

export type sourceWithPage = {
  source: string;
  page: number;
};

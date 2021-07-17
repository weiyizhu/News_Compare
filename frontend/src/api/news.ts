import axios from "axios";
import {
  Filters,
  sourceWithPage,
  StateProps,
} from "../components/Search/Search";

const url = process.env.REACT_APP_PORT || process.env.REACT_APP_EXPRESS_PORT;

export interface NewsArticle {
  author?: string | null;
  content?: string | null;
  description: string;
  publishedAt: string;
  source: { id: string; name: string };
  title: string;
  url: string;
  urlToImage: string;
}

export interface NewsResponseProps {
  articles: NewsArticle[];
  status: "ok" | "error";
  totalResults: number;
  code?: string | null;
  message?: string | null;
}

export const getEverything = async (
  keywords: string,
  fromDate: string,
  toDate: string,
  sourcesWithPage: sourceWithPage[],
  filter: Filters,
  values: StateProps,
  setValues: React.Dispatch<React.SetStateAction<StateProps>>
) => {
  let newsResponseArr: NewsResponseProps[] = [];
  for (let sourceWithPage of sourcesWithPage) {
    const res = await axios
      .post<Promise<NewsResponseProps>>(url + "/news/everything", {
        params: {
          q: keywords,
          from: fromDate,
          to: toDate,
          sources: sourceWithPage["source"],
          page: sourceWithPage["page"],
          pageSize: 3,
          sortBy: filter.toString(),
          language: "en"
        },
      })
      .catch((err) => {
        console.log(err.message);
      });
    const data = res && (await res.data);
    console.log(data);
    data && newsResponseArr.push(data);
  }
  setValues({ ...values, news: newsResponseArr, loading: false });
  // axios
  //   .post<NewsResponseProps[]>(url + "/news/everything", {
  //     params: {
  //       q: keywords,
  //       from: fromDate,
  //       to: toDate,
  //       sources: sources,
  //     },
  //   })
  //   .then((res) => {
  //     console.log(res.data);
  //     setValues({ ...values, news: res.data });
  //   })
  //   .catch((err) => {
  //     console.error(err.message);
  //   });
};

export const getTopHeadlines = async (
  keywords: string,
  sourcesWithPage: sourceWithPage[],
  values: StateProps,
  setValues: React.Dispatch<React.SetStateAction<StateProps>>
) => {
  let newsResponseArr: NewsResponseProps[] = [];
  for (let sourceWithPage of sourcesWithPage) {
    const res = await axios
      .post<Promise<NewsResponseProps>>(url + "/news/top-headlines", {
        params: {
          q: keywords,
          sources: sourceWithPage["source"],
          page: sourceWithPage["page"],
          pageSize: 3,
        },
      })
      .catch((err) => {
        console.log(err.message);
        return;
      });

    const data = res && (await res.data);
    console.log(data);
    data && newsResponseArr.push(data);
  }
  setValues({ ...values, news: newsResponseArr, loading: false });

  // axios
  //   .post<NewsResponseProps[]>(url + "/news/top-headlines", {
  //     params: {
  //       q: keywords,
  //       sources: sources,
  //       page: page,
  //       pageSize: 3,
  //     },
  //   })
  //   .then((res) => {
  //     console.log(res.data);
  //     setValues({ ...values, news: res.data });
  //   })
  //   .catch((err) => {
  //     console.error(err.message);
  //   });
};

export interface Sources {
  // category: string;
  // country: string;
  // description: string;
  // id: string;
  // language: string;
  // name: string;
  // url: string;
  id: string;
  name: string;
}

export const getSources = (): Sources[] | void => {
  axios
    .post<Sources[]>(url + "/news/sources", {
      params: {
        country: "us",
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.error(err.message);
    });
};

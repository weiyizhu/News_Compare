import axios from "axios";
import { StateProps } from "../components/Search/Search";

const url = process.env.REACT_APP_PORT || process.env.REACT_APP_EXPRESS_PORT;

export interface getEverythingProps {
  (keywords: string, fromDate: string, toDate: string, sources?: string): void;
}

export interface NewsResponseProps {
  author?: string | null;
  content?: string | null;
  description: string;
  publishedAt: string;
  source: { id: string; name: string };
  title: string;
  url: string;
  urlToImage: string;
}

export const getEverything = (
  keywords: string,
  fromDate: string,
  toDate: string,
  sources: string = "cnn, the-wall-street-journal, fox-news",
  values: StateProps,
  setValues: React.Dispatch<React.SetStateAction<StateProps>>
) => {
  axios
    .post<NewsResponseProps[]>(url + "/news/everything", {
      params: {
        q: keywords,
        from: fromDate,
        to: toDate,
        sources: sources,
      },
    })
    .then((res) => {
      console.log(res.data);
      setValues({ ...values, news: res.data });
    })
    .catch((err) => {
      console.error(err.message);
    });
};

export const getTopHeadlines = (
  keywords: string,
  sources: string,
  values: StateProps,
  setValues: React.Dispatch<React.SetStateAction<StateProps>>
) => {
  axios
    .post<NewsResponseProps[]>(url + "/news/top-headlines", {
      params: {
        q: keywords,
        sources: sources,
      },
    })
    .then((res) => {
      console.log(res.data);
      setValues({ ...values, news: res.data });
    })
    .catch((err) => {
      console.error(err.message);
    });
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

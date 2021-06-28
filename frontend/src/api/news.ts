import { ParsableDate } from "@material-ui/pickers/constants/prop-types";
import axios from "axios";

const url = process.env.REACT_APP_PORT || process.env.REACT_APP_EXPRESS_PORT;

export interface getEverythingProps {
  (
    keywords: string,
    fromDate: ParsableDate,
    toDate: ParsableDate,
    sources?: string
  ): string;
}

export const getEverything: getEverythingProps = (
  keywords,
  fromDate,
  toDate,
  sources = "cnn, the-wall-street-journal, fox-news"
): string => {
  axios
    .post(url + "/news/everything", {
      params: {
        q: keywords,
        from: fromDate,
        to: toDate,
        sources: sources,
      },
    })
    .then((res: any) => {
      console.log(res.data);
    })
    .catch((err: any) => {
      console.error(err.message);
    });
  return "";
};

export const getTopHeadlines = () => {
  axios
    .post(url + "/news/top-headlines", {
      params: {
        sources: "cnn, the-wall-street-journal, fox-news",
      },
    })
    .then((res: any) => {
      console.log(res.data);
    })
    .catch((err: any) => {
      console.error(err.message);
    });
};

export interface Sources {
  category: string;
  country: string;
  description: string;
  id: string;
  language: string;
  name: string;
  url: string;
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

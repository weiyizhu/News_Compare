import { ParsableDate } from "@material-ui/pickers/constants/prop-types";
import axios from "axios";

const url = process.env.REACT_APP_PORT || process.env.REACT_APP_EXPRESS_PORT;

export interface getEverythingProps {
  (
    keywords: string,
    fromDate: ParsableDate,
    toDate: ParsableDate,
    sources?: string
  ): void;
}

export const getEverything: getEverythingProps = (
  keywords,
  fromDate,
  toDate,
  sources = "cnn, the-wall-street-journal, fox-news"
) => {
  axios
    .post(url + "/news/everything", {
      params: {
        q: keywords,
        from: fromDate?.toString(),
        to: toDate?.toString(),
        sources: sources,
      },
    })
    .then((res: any) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.error(err.message);
    });
};

export const getTopHeadlines = (keywords: string, sources: string) => {
  axios
    .post(url + "/news/top-headlines", {
      params: {
        q: keywords,
        sources: sources
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
  // category: string;
  // country: string;
  // description: string;
  // id: string;
  // language: string;
  // name: string;
  // url: string;
  id: string;
  name:string
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

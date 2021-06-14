import React from "react";
import axios from "axios";

const url = process.env.REACT_APP_PORT || process.env.REACT_APP_EXPRESS_PORT;

const getEverything = () => {
  axios
    .post(url + "/news/everything", {
      params: {
        q: "keyword",
      },
    })
    .then((res: any) => {
      console.log(res.data);
    })
    .catch((err: any) => {
      console.error(err.message);
    });
};

const getTopHeadlines = () => {
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

const getSources = () => {
  axios
    .post(url + "/news/sources", {
      params: {
        country: "us",
      },
    })
    .then((res: any) => {
      console.log(res.data);
    })
    .catch((err: any) => {
      console.error(err.message);
    });
};

const Search: React.FC = () => {
  return (
    <div>
      <button onClick={getEverything}>get Everything</button>
      <button onClick={getTopHeadlines}>get Headlines</button>
      <button onClick={getSources}>get Headlines</button>
    </div>
  );
};
export default Search;

import React from "react";
const axios = require("axios");

const url = process.env.REACT_APP_PORT || process.env.REACT_APP_EXPRESS_PORT;

const getEverything = () => {
  axios
    .post(url + "/news/everything", {
      query: "q=keyword",
    })
    .then((res: any) => {
      console.log(res);
    })
    .catch((err: any) => {
      console.error(err.message);
    });
};

const Search: React.FC = () => {
  return <button onClick={getEverything}>get Everything</button>;
};
export default Search;

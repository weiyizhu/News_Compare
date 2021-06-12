import React from "react";
import axios from "axios";

const url = process.env.REACT_APP_PORT || process.env.REACT_APP_EXPRESS_PORT;

const getEverything = () => {
  axios
    .post(url + "/news/everything", {
      query: "q=keyword",
    })
    .then((res: any) => {
      console.log(JSON.stringify(res.data));
    })
    .catch((err: any) => {
      console.error(err.message);
    });
};

const Search: React.FC = () => {
  return (
    <div>
      <button onClick={getEverything}>get Everything</button>
    </div>
  );
};
export default Search;

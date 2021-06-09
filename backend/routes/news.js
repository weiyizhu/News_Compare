const express = require("express");
const router = express.Router();
const axios = require("axios");

// Get News API configs
const newsAPIUrl = process.env.NEWS_API_URI;
const newsAPIKey = process.env.NEWS_API_KEY;

// Everything endpoint
router.post("/everything", (req, res) => {
  const query = req.body.query;
  console.log(query);
  const newsAPIKey = process.env.NEWS_API_KEY;
  const url = encodeURI(newsAPIUrl + "/everything?" + query);
  console.log(url);
  axios
    .get(url)
    .then((resp) => {
    //   console.log(resp);
    //   console.log(resp.data);
      res.json(resp.data);
    })
    .catch((err) => {
      //console.log(err.response.data);
      res.status(err.response.status).json(err.response.data);
    });
});

// Top Headlines endpoint

// Soures endpoint

module.exports = router;

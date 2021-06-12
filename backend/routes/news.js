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
  const url = encodeURI(`${newsAPIUrl}/everything?${query}&apiKey=${newsAPIKey}`);
  axios
    .get(url)
    .then((result) => {
      res.json(result.data.articles);
    })
    .catch((err) => {
      //console.log(err.response.data);
      res.status(err.response.status).json(err.response.data);
    });
});

// Top Headlines endpoint

// Soures endpoint

module.exports = router;

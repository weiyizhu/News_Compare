const express = require("express");
const router = express.Router();
const axios = require("axios");

// Get News API configs
const newsAPIUrl = process.env.NEWS_API_URI;
const newsAPIKey = process.env.NEWS_API_KEY;

const getConfig = (paramsData) => {
  return {
    params: paramsData,
    headers: {
      "X-Api-Key": newsAPIKey,
    },
  };
}

// Everything endpoint
router.post("/everything", (req, res) => {
  const params = req.body.params;
  const url = encodeURI(`${newsAPIUrl}/everything`);
  axios
    .get(url, getConfig(params))
    .then((result) => {
      res.json(result.data.articles);
    })
    .catch((err) => {
      //console.log(err.response.data);
      res.status(err.response.status).json(err.response.data);
    });
});

// Top Headlines endpoint
router.post("/top-headlines", (req, res) => {
  const params = req.body.params;
  const url = encodeURI(`${newsAPIUrl}/top-headlines`);
  axios
    .get(url, getConfig(params))
    .then((result) => {
      console.log(result.data);
      res.json(result.data.articles);
    })
    .catch((err) => {
      res.status(err.response.status).json(err.response.data);
    });
});

// Soures endpoint
router.post("/sources", (req, res) => {
  const params = req.body.params;
  const url = encodeURI(`${newsAPIUrl}/sources`);
  axios
    .get(url, getConfig(params))
    .then((result) => {
      console.log(result.data);
      res.json(result.data.sources);
    })
    .catch((err) => {
      res.status(err.response.status).json(err.response.data);
    });
});


module.exports = router;
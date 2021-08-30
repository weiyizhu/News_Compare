import express from "express";
const router = express.Router();
import axios, { AxiosError } from "axios";

// Get News API configs
const newsAPIUrl = process.env.NEWS_API_URI;
const newsAPIKey = process.env.NEWS_API_KEY;

interface Config {
  q?: string;
  from?: string;
  to?: string;
  sources?: string;
  country?: string;
}

const getConfig = (paramsData: Config) => {
  return {
    params: paramsData,
    headers: {
      "X-Api-Key": newsAPIKey,
    },
  };
};

// Everything endpoint
router.post("/everything", (req, res) => {
  const params = req.body.params;
  const url = encodeURI(`${newsAPIUrl}/everything`);
  axios
    .get(url, getConfig(params))
    .then((result) => {
      res.json(result.data);
    })
    .catch((err: AxiosError) => {
      console.log(err.response?.data);
      res
        .status(err.response?.status ?? 500)
        .json(err.response?.data ?? err.message);
    });
});

// Top Headlines endpoint
router.post("/top-headlines", (req, res) => {
  const params = req.body.params;
  const url = encodeURI(`${newsAPIUrl}/top-headlines`);
  axios
    .get(url, getConfig(params))
    .then((result) => {
      res.json(result.data);
    })
    .catch((err: AxiosError) => {
      console.log(err.response?.data);
      res
        .status(err.response?.status ?? 500)
        .json(err.response?.data ?? err.message);
    });
});

// Soures endpoint
router.post("/sources", (req, res) => {
  const params = req.body.params;
  const url = encodeURI(`${newsAPIUrl}/sources`);
  axios
    .get(url, getConfig(params))
    .then((result) => {
      res.json(result.data.sources);
    })
    .catch((err) => {
      res.status(500).json(err.message);
    });
});

export default router;

import { Router } from "express";
const router = Router();
import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();

const url = 'https://spaceflight-news2.p.rapidapi.com/v3/articles?_sort=title&_limit=10';
const options = {
  method: 'GET',
  headers: {
    'content-type': 'application/octet-stream',
    accept: 'application/json',
    'X-RapidAPI-Key': process.env.X_RAPIDAPI_KEY,
    'X-RapidAPI-Host': process.env.X_RAPIDAPI_HOST,
  }
};

router.get('/fetch-articles', async (req, res) => {
  try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result)
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch articles' });
  }
});

export default router;
const axios = require("axios").default;
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3001;
const allowedOriginList = ["http://localhost:3000"];
const newsAPIUrl =
  "https://newsapi.org/v2/top-headlines?country=in&category=general";
const newsAPIKey = process.env.NEWS_API_KEY;

const responseStatusToErrorMessageMapping = {
  401: "NewsAPI key has expired or is invalid",
};

app.use(cors());

app.get("/news-data", (req, res) => {
  const requestOrigin = req.get("origin");

  const matchingOrigin = allowedOriginList.find((allowedOrigin) =>
    allowedOrigin.toLowerCase().includes(requestOrigin)
  );

  if (matchingOrigin === undefined) {
    res.status(403).send({ error: "Access Forbidden" });
    console.log("Didn't match origin");
  }

  let newsAPIData = null;
  axios
    .get(newsAPIUrl, {
      headers: {
        "X-Api-Key": newsAPIKey,
      },
    })
    // .then((response) => response.json())
    .then((responseJSONData) => {
      for (const [key, value] of Object.entries(
        responseJSONData.data.articles
      )) {
        console.log(`${key}, ${Object.entries(value)}`);
      }
      newsAPIData = { articles: responseJSONData.data.articles };
      // res.append("Access-Control-Allow-Origin", "*");
      // res.append("Content-Type", "application/json");
      res.status(200).json(newsAPIData);
    })
    .catch((error) => {
      const errorResponseStatusCode = error.response.status;
      console.log(`Error response status: ${errorResponseStatusCode}`);
      let errorMessage = null;
      if (errorResponseStatusCode === 401) {
        errorMessage =
          responseStatusToErrorMessageMapping[errorResponseStatusCode];
      } else {
        errorMessage = error.message;
      }

      res.status(500).json({ message: errorMessage });
    });
});

app.listen(port, () => {
  console.log("Express server listening to requests on port 3001 !");
});

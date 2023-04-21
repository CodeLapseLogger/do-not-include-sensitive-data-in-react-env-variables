import { useState, useEffect, useCallback, useMemo } from "react";
import NewsFeedItem from "./NewsFeedItem";

import styles from "./NewsFeed.module.css";

const NewsFeed = (props) => {
  // const newsAPIKey = process.env.REACT_APP_NEWS_API_KEY;

  const [newsData, setNewsData] = useState([]);
  const [apiRequestError, setAPIRequestError] = useState("");

  // const newsAPIUrl = `https://newsapi.org/v2/top-headlines?country=in&category=general`;
  const newsAPIUrl = `http://localhost:3001/news-data`;

  const newsAPIRequestOptions = useMemo(
    () => ({
      method: "GET",
      mode: "cors",
      headers: {
        // "Content-Type": "application/json",
        // "Access-Control-Allow-Origin": "newsapi.org",
        // "X-Api-Key": newsAPIKey,
      },
    }),
    [
      /*newsAPIKey*/
    ]
  );

  const fetchNewsData = useCallback(async () => {
    // const newsAPIResponse = await fetch(newsAPIUrl, newsAPIRequestOptions);
    const newsAPIResponse = await fetch(newsAPIUrl);

    const newsAPIResponseData = await newsAPIResponse.json();
    if (newsAPIResponse.ok) {
      const newsArticlesData = newsAPIResponseData.articles;

      setNewsData(newsArticlesData);
      setAPIRequestError("");
    } else {
      const errorMessage = newsAPIResponseData.message;
      // const errorMessage = newsAPIResponse.error;
      setAPIRequestError(errorMessage);
    }
  }, [newsAPIUrl /*, newsAPIRequestOptions*/]);

  useEffect(() => {
    fetchNewsData();
  }, [fetchNewsData]);

  return (
    <div className={styles.newsFeedContainer}>
      <h3 className={styles.newsFeedHeading}>News Headlines</h3>
      {apiRequestError ?? <p>Error with News API request: {apiRequestError}</p>}
      <ul className={styles.newsFeed}>
        {newsData.map((singleNewsArticleData) => {
          return (
            <NewsFeedItem
              key={`${singleNewsArticleData.author}: ${singleNewsArticleData.title}`}
              itemData={singleNewsArticleData}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default NewsFeed;

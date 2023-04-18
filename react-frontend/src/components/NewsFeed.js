import { useState, useEffect, useCallback, useMemo } from "react";

const NewsFeed = (props) => {
  const newsAPIKey = process.env.REACT_APP_NEWS_API_KEY;
  console.log(`News API Key: ${newsAPIKey}`);

  const [newsData, setNewsData] = useState([]);
  const newsAPIUrl = `https://newsapi.org/v2/top-headlines?country=in&category=general`;

  const newsAPIRequestOptions = useMemo(
    () => ({
      method: "GET",
      mode: "cors",
      headers: {
        // "Content-Type": "application/json",
        // "Access-Control-Allow-Origin": "newsapi.org",
        "X-Api-Key": newsAPIKey,
      },
    }),
    [newsAPIKey]
  );

  const fetchNewsData = useCallback(async () => {
    const newsAPIResponse = await fetch(newsAPIUrl, newsAPIRequestOptions);
    if (newsAPIResponse.ok) {
      const newsAPIResponseData = await newsAPIResponse.json();
      const newsArticlesData = newsAPIResponseData.articles;
      console.log(`News article data: ${JSON.stringify(newsArticlesData)}`);
      setNewsData(newsArticlesData);
    }
  }, [newsAPIUrl, newsAPIRequestOptions]);

  useEffect(() => {
    fetchNewsData();
  }, [fetchNewsData]);

  return (
    <div>
      <ul>
        {newsData.map((singleNewsArticleData) => {
          return (
            <li
              key={`${singleNewsArticleData.author}: ${singleNewsArticleData.title}`}
            >
              <p>Source: {singleNewsArticleData.source.name}</p>
              <p>Author: {singleNewsArticleData.author}</p>
              <p>Title: {singleNewsArticleData.title}</p>
              <p>Description: {singleNewsArticleData.description}</p>
              <p>Published At: {singleNewsArticleData.publishedAt}</p>
              <img
                src={singleNewsArticleData.urlToImage}
                alt={`for article titled ${singleNewsArticleData.title}`}
              />
              <a
                href={singleNewsArticleData.url}
                target="_blank"
                rel="noreferrer"
              >
                Read Full Article
              </a>
              <hr />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default NewsFeed;

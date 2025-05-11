import React, { useEffect, useState } from "react";
import "./NewsFeed.css";

interface User {
  username: string;
}

interface NewsFeedProps {
  user: User | null;
}

const NewsFeed: React.FC<NewsFeedProps> = ({ user }) => {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const storedUser = JSON.parse(localStorage.getItem("user") || "null");

  useEffect(() => {
    const currentUser = user || storedUser;
    if (!currentUser) return;

    const cachedArticles = localStorage.getItem("articles");
    const cachedTime = localStorage.getItem("articlesTimestamp");

    const cacheExpirationMs = 1000 * 60 * 60; // שעה

    // השתמש בקאש אם הוא עדיין בתוקף
    if (
      cachedArticles &&
      cachedTime &&
      Date.now() - Number(cachedTime) < cacheExpirationMs
    ) {
      setArticles(JSON.parse(cachedArticles));
      setLoading(false);
      return;
    }

    const fetchNews = async () => {
      try {
        const res = await fetch(
          "https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=10e92041a1c545a9be9a2ac3c40e7df8"
        );
        const data = await res.json();

        if (!data.articles || !Array.isArray(data.articles)) {
          throw new Error("Articles not found in response");
        }

        const filtered = data.articles.filter(
          (article: any) => article.urlToImage && article.urlToImage !== ""
        );

        setArticles(filtered);
        localStorage.setItem("articles", JSON.stringify(filtered));
        localStorage.setItem("articlesTimestamp", Date.now().toString());
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [user]);

  if (!user && !storedUser) {
    return <p>You must be logged in to view articles.</p>;
  }

  if (loading) return <p className="loading-text">Loading news...</p>;

  if (articles.length === 0)
    return <p className="loading-text">No articles with real images found.</p>;

  return (
    <div className="newsfeed-wrapper">
      <div className="overlay"></div>
      <div className="glass">
        <h2 className="title">📰 TechCrunch News</h2>
        <div className="articles-container">
          {articles.map((article, index) => (
            <div className="article-card" key={index}>
              <img
                className="card-image"
                src={article.urlToImage}
                alt={article.title}
              />
              <h3 className="card-title">{article.title}</h3>
              <p className="card-preview">{article.description}</p>
              <a
                className="card-button"
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Read more
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsFeed;
